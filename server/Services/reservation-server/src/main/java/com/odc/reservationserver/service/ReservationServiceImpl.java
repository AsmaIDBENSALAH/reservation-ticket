package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.MatchDetailsDTO;
import com.odc.reservationserver.dto.MatchZoneDTO;
import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.dto.events.PaymentRequestEvent;
import com.odc.reservationserver.dto.events.PaymentResponseEvent;
import com.odc.reservationserver.dto.events.ReservationConfirmedEvent;
import com.odc.reservationserver.entities.Reservation;
import com.odc.reservationserver.enums.ReservationStatus;
import com.odc.reservationserver.mapper.ReservationMapper;
import com.odc.reservationserver.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final MatchFeignClient matchFeignClient;
    private final ReservationMapper reservationMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {

        // Récupérer les détails du match
        MatchDetailsDTO matchDetails = matchFeignClient.getMatchDetails(dto.getMatchId());

        // Trouver la zone demandée
        MatchZoneDTO selectedZone = matchDetails.getZones().stream()
                .filter(z -> z.getZoneId().equals(dto.getMatchZonePricingId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("L'offre de zone sélectionnée n'existe pas pour ce match"));

        // Vérifier la disponibilité
        if (selectedZone.getAvailableSeats() < dto.getQuantity()) {
            throw new RuntimeException("Places insuffisantes pour cette zone.");
        }

        // Décrémenter la disponibilité
        matchFeignClient.decreaseAvailability(dto.getMatchId(), dto.getMatchZonePricingId(), dto.getQuantity());

        // Créer la réservation avec toutes les données miroir
        Reservation reservation = Reservation.builder()
                .matchId(dto.getMatchId())
                .userId(dto.getUserId())
                .userEmail(dto.getUserEmail())
                .userName(dto.getUserName())
                .matchZonePricingId(dto.getMatchZonePricingId())
                .stadiumZoneName(selectedZone.getZoneName())
                .porte(selectedZone.getPorte())
                .quantity(dto.getQuantity())
                .totalPrice(selectedZone.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())))
                .status(ReservationStatus.PENDING)
                .reservationDate(LocalDateTime.now())
                .stripeToken(dto.getStripeToken())
                .stadeName(matchDetails.getStadeName())
                .currency(matchDetails.getCurrency())
                .homeTeam(matchDetails.getHomeTeam())
                .awayTeam(matchDetails.getAwayTeam())
                .competition(matchDetails.getCompetition())
                .matchDate(matchDetails.getDate())
                .build();

        reservationRepository.save(reservation);

        // Kafka pour le paiement
        PaymentRequestEvent paymentEvent = new PaymentRequestEvent(
                reservation.getId(),
                reservation.getTotalPrice().doubleValue(),
                matchDetails.getCurrency(),
                dto.getStripeToken(),
                dto.getUserEmail(),
                dto.getUserName(),
                dto.getMatchId(),
                selectedZone.getZoneName(),
                dto.getQuantity()
        );
        kafkaTemplate.send("payment-request-topic", paymentEvent);

        return reservationMapper.toReservationResponseDTO(reservation);
    }
    @Override
    public Page<ReservationResponseDTO> getReservationsByUserId(String userId, Pageable pageable) {
        return reservationRepository.findByUserIdAndStatusIn(
                userId,
                List.of(ReservationStatus.CONFIRMED, ReservationStatus.EXPIRED),
                pageable
        ).map(reservationMapper::toReservationResponseDTO);
    }
    @Override
    @Scheduled(fixedRate = 3600000)
    public void expirePassedMatches() {
        List<Reservation> confirmedReservations = reservationRepository
                .findAllByStatusAndMatchDateBefore(ReservationStatus.CONFIRMED, LocalDateTime.now()); // ✅ direct en base

        for (Reservation res : confirmedReservations) {
            res.setStatus(ReservationStatus.EXPIRED);
            reservationRepository.save(res);
            log.info("Réservation expirée (match passé) : {}", res.getId());
        }
    }

    @Override
    public void confirmReservation(UUID reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.PENDING) return;



        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(reservation);
        ReservationConfirmedEvent event = buildReservationConfirmedEvent(reservation);
        kafkaTemplate.send("reservation-confirmed-topic", event);
    }

    private ReservationConfirmedEvent buildReservationConfirmedEvent(Reservation reservation) {
        return new ReservationConfirmedEvent(
                reservation.getId(),
                reservation.getUserId(),
                reservation.getUserName(),
                reservation.getUserEmail(),
                reservation.getMatchId(),
                reservation.getMatchZonePricingId(),
                reservation.getStadiumZoneName(),
                reservation.getQuantity(),
                reservation.getTotalPrice().doubleValue(),
                reservation.getStatus().toString(),
                reservation.getCurrency(),
                reservation.getHomeTeam(),
                reservation.getAwayTeam(),
                reservation.getCompetition(),
                reservation.getStadeName(),
                reservation.getMatchDate()
        );
    }

    @Override
    public void cancelReservation(UUID reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED ||
                reservation.getStatus() == ReservationStatus.EXPIRED) {
            throw new RuntimeException("Cette réservation ne peut pas être annulée.");
        }

        if (reservation.getMatchDate() != null && reservation.getMatchDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Impossible d'annuler une réservation pour un match déjà passé.");
        }

        matchFeignClient.increaseAvailability(
                reservation.getMatchId(),
                reservation.getMatchZonePricingId(),
                reservation.getQuantity()
        );

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
        ReservationConfirmedEvent event = buildReservationConfirmedEvent(reservation);
        kafkaTemplate.send("reservation-confirmed-topic", event);
    }
    /* =========================
       KAFKA LISTENER : RETOUR DU PAIEMENT
       ========================= */
    @KafkaListener(topics = "payment-response-topic", groupId = "reservation-group")
    public void handlePaymentResult(PaymentResponseEvent event) {
        log.info("Réception résultat paiement pour réservation : {}", event.getReservationId());

        if ("SUCCESS".equals(event.getStatus())) {
            this.confirmReservation(event.getReservationId());
        } else {
            this.cancelReservation(event.getReservationId());
        }
    }

    /* =========================
       SCHEDULER : ANNULATION AUTO (15 MIN)
       ========================= */
    @Scheduled(fixedRate = 60000)
    public void cancelExpiredReservations() {
        LocalDateTime expirationTime = LocalDateTime.now().minusMinutes(15);
        List<Reservation> expiredReservations = reservationRepository
                .findAllByStatusAndReservationDateBefore(ReservationStatus.PENDING, expirationTime);

        for (Reservation res : expiredReservations) {
            log.info("Annulation automatique (Timeout 15min) pour : {}", res.getId());

            try {
                matchFeignClient.increaseAvailability(
                        res.getMatchId(),
                        res.getMatchZonePricingId(),
                        res.getQuantity()
                );
            } catch (Exception e) {
                log.error("Impossible d'incrémenter la disponibilité pour : {}", res.getId(), e);
            }

            res.setStatus(ReservationStatus.CANCELLED);
            reservationRepository.save(res);

            // Notifier l'utilisateur par email
            try {
                ReservationConfirmedEvent event = buildReservationConfirmedEvent(res);
                kafkaTemplate.send("reservation-confirmed-topic", event);
                log.info("Email annulation (timeout) envoyé pour : {}", res.getId());
            } catch (Exception e) {
                log.error("Impossible d'envoyer la notification pour : {}", res.getId(), e);
            }
        }
    }



    /* =========================
       PAGINATION
       ========================= */
    public Page<ReservationResponseDTO> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable)
                .map(reservationMapper::toReservationResponseDTO);
    }


}
