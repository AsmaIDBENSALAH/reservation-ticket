package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.MatchDetailsDTO;
import com.odc.reservationserver.dto.MatchZoneDTO;
import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.dto.events.PaymentRequestEvent;
import com.odc.reservationserver.dto.events.PaymentResponseEvent;
import com.odc.reservationserver.entities.Reservation;
import com.odc.reservationserver.entities.Ticket;
import com.odc.reservationserver.enums.ReservationStatus;
import com.odc.reservationserver.enums.TicketStatus;
import com.odc.reservationserver.mapper.ReservationMapper;
import com.odc.reservationserver.repository.ReservationRepository;
import com.odc.reservationserver.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final TicketRepository ticketRepository;
    private final MatchFeignClient matchFeignClient;
    private final ReservationMapper reservationMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate; // 👈 AJOUTÉ

    /* =========================
       CREATE RESERVATION
       ========================= */
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {

        // 1️⃣ Vérifier le match + zone via match-service
        MatchDetailsDTO matchDetails = matchFeignClient.getMatchDetails(dto.getMatchId());

        MatchZoneDTO selectedZone = matchDetails.getZones().stream()
                .filter(z -> z.getZoneId().equals(dto.getStadiumZoneId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Zone invalide pour ce match"));

        if (selectedZone.getAvailableSeats() < dto.getQuantity()) {
            throw new RuntimeException("Places insuffisantes.");
        }

        // 2️⃣ Décrémenter via Feign
        matchFeignClient.decreaseAvailability(dto.getMatchId(), dto.getStadiumZoneId(), dto.getQuantity());

        // 3️⃣ Créer la réservation en PENDING
        Reservation reservation = Reservation.builder()
                .matchId(dto.getMatchId())
                .userId(dto.getUserId())
                .stadiumZoneId(dto.getStadiumZoneId())
                .porte(dto.getPorte())
                .quantity(dto.getQuantity())
                .status(ReservationStatus.PENDING)
                .reservationDate(LocalDateTime.now())
                .build();

        reservationRepository.save(reservation);

        // 4️⃣ ENVOYER À KAFKA POUR LE PAIEMENT (Nouveauté)
        // On envoie le token Stripe reçu du Front et le prix total
        // Remplace la ligne du PaymentRequestEvent par celle-ci :
        PaymentRequestEvent paymentEvent = new PaymentRequestEvent(
                reservation.getId(),
                selectedZone.getPrice().multiply(java.math.BigDecimal.valueOf(dto.getQuantity())).doubleValue(),
                "eur",
                dto.getStripeToken()
        );
        kafkaTemplate.send("payment-request-topic", paymentEvent);

        return reservationMapper.toReservationResponseDTO(reservation);
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
    @Scheduled(fixedRate = 60000) // Vérifie chaque minute
    public void cancelExpiredReservations() {
        LocalDateTime expirationTime = LocalDateTime.now().minusMinutes(15);
        List<Reservation> expiredReservations = reservationRepository
                .findAllByStatusAndReservationDateBefore(ReservationStatus.PENDING, expirationTime);

        for (Reservation res : expiredReservations) {
            log.info("Annulation automatique (Timeout 15min) pour : {}", res.getId());
            this.cancelReservation(res.getId());
        }
    }

    /* =========================
        CONFIRM RESERVATION (Inchangé mais appelé par Kafka)
        ========================= */
    public void confirmReservation(UUID reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.PENDING) return;

        for (int i = 0; i < reservation.getQuantity(); i++) {
            Integer seatNumber = findNextAvailableSeat(reservation.getMatchId(), reservation.getStadiumZoneId());
            Ticket ticket = Ticket.builder()
                    .matchId(reservation.getMatchId())
                    .userId(reservation.getUserId())
                    .stadiumZoneId(reservation.getStadiumZoneId())
                    .seatNumber(seatNumber)
                    .status(TicketStatus.VALID)
                    .reservation(reservation)
                    .build();
            ticketRepository.save(ticket);
        }

        reservation.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(reservation);
    }
    /* =========================
        CANCEL RESERVATION (Inchangé : libère les places via Feign)
        ========================= */
    public void cancelReservation(UUID reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) return;

        matchFeignClient.increaseAvailability(
                reservation.getMatchId(),
                reservation.getStadiumZoneId(),
                reservation.getQuantity()
        );

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }
    /* =========================
       PAGINATION
       ========================= */
    public Page<ReservationResponseDTO> getAllReservations(Pageable pageable) {
        return reservationRepository.findAll(pageable)
                .map(reservationMapper::toReservationResponseDTO);
    }

    /* =========================
       SEAT MANAGEMENT
       ========================= */
    private Integer findNextAvailableSeat(UUID matchId, UUID zone) {

        List<Integer> occupiedSeats =
                ticketRepository.findOccupiedSeatNumbers(matchId, zone);

        int seat = 1;
        while (occupiedSeats.contains(seat)) {
            seat++;
        }
        return seat;
    }
}
