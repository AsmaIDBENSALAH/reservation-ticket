package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.MatchDetailsDTO;
import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.entities.Reservation;
import com.odc.reservationserver.entities.Ticket;
import com.odc.reservationserver.enums.ReservationStatus;
import com.odc.reservationserver.enums.TicketStatus;
import com.odc.reservationserver.mapper.ReservationMapper;
import com.odc.reservationserver.repository.ReservationRepository;
import com.odc.reservationserver.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final TicketRepository ticketRepository;
    private final MatchFeignClient matchFeignClient;
    private final ReservationMapper reservationMapper;




    /* =========================
       CREATE RESERVATION
       ========================= */
    public ReservationResponseDTO createReservation(ReservationRequestDTO dto) {

        // 1️⃣ Vérifier le match + zone via match-service
        MatchDetailsDTO matchDetails =
                matchFeignClient.getMatchDetails(dto.getMatchId());

        boolean zoneExists = matchDetails.getZones().stream()
                .anyMatch(z -> z.getZoneName().equals(dto.getStadiumZoneId()));

        if (!zoneExists) {
            throw new RuntimeException("Zone invalide pour ce match");
        }

        // 2️⃣ Vérifier disponibilité
        matchFeignClient.decreaseAvailability(
                dto.getMatchId(),
                dto.getStadiumZoneId(),
                dto.getQuantity()
        );

        // 3️⃣ Créer la réservation
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

        return reservationMapper.toReservationResponseDTO(reservation);
    }

    /* =========================
       CONFIRM RESERVATION
       ========================= */
    public void confirmReservation(UUID reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != ReservationStatus.PENDING) {
            throw new RuntimeException("Reservation déjà traitée");
        }

        // 4️⃣ Générer les tickets avec sièges libres
        for (int i = 0; i < reservation.getQuantity(); i++) {

            Integer seatNumber = findNextAvailableSeat(
                    reservation.getMatchId(),
                    reservation.getStadiumZoneId()
            );

            Ticket ticket = Ticket.builder()
                    .matchId(reservation.getMatchId())
                    .userId(reservation.getUserId())
                    .stadiumZoneId(reservation.getStadiumZoneId())
                    .stadiumZone(reservation.getStadiumZone())
                    .porte(reservation.getPorte())
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
       CANCEL RESERVATION
       ========================= */
    public void cancelReservation(UUID reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            return;
        }

        // 5️⃣ Supprimer tickets
        List<Ticket> tickets =
                ticketRepository.findByReservationId(reservationId);

        ticketRepository.deleteAll(tickets);

        // 6️⃣ Incrémenter disponibilité côté match-service
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
