package com.odc.reservationserver.mapper;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.dto.ReservationWithTicketsDTO;
import com.odc.reservationserver.dto.TicketResponseDTO;
import com.odc.reservationserver.entities.Reservation;
import com.odc.reservationserver.entities.Ticket;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReservationMapper {
    /* =========================
          ReservationRequestDTO -> Reservation
          ========================= */
    public Reservation toReservationEntity(ReservationRequestDTO dto) {
        if (dto == null) return null;

        return Reservation.builder()
                .matchId(dto.getMatchId())
                .userId(dto.getUserId())
                .userEmail(dto.getUserEmail())
                .userName(dto.getUserName())
                .matchZonePricingId(dto.getMatchZonePricingId())
                .quantity(dto.getQuantity())
                .reservationDate(LocalDateTime.now())
                .build();
    }
    /* =========================
       Reservation -> ReservationResponseDTO
       ========================= */
    public ReservationResponseDTO toReservationResponseDTO(Reservation reservation) {
        return ReservationResponseDTO.builder()
                .reservationId(reservation.getId())
                .userId(reservation.getUserId())
                .userName(reservation.getUserName())
                .userEmail(reservation.getUserEmail())
                .matchId(reservation.getMatchId())
                .stadiumZone(reservation.getStadiumZoneName())
                .stadiumZoneId(reservation.getMatchZonePricingId())
                .porte(reservation.getPorte())
                .quantity(reservation.getQuantity())
                .totalPrice(reservation.getTotalPrice())
                .status(reservation.getStatus())
                .reservationDate(reservation.getReservationDate())
                // ✅ Nouvelles infos miroirz
                .currency(reservation.getCurrency())
                .homeTeam(reservation.getHomeTeam())
                .awayTeam(reservation.getAwayTeam())
                .competition(reservation.getCompetition())
                .stadeName(reservation.getStadeName())
                .reservationDate(reservation.getReservationDate())
                .build();
    }

    /* =========================
       Ticket -> TicketResponseDTO
       ========================= */
    public TicketResponseDTO toTicketResponseDTO(Ticket ticket) {
        if (ticket == null) return null;

        return TicketResponseDTO.builder()
                .ticketId(ticket.getId())
                .matchId(ticket.getMatchId())
                .stadiumZone(ticket.getStadiumZone())
                .seatNumber(ticket.getSeatNumber())
                .price(ticket.getPrice())
                .qrCode(ticket.getQrCode())
                .status(ticket.getStatus())
                .porte(ticket.getPorte())
                .stadiumZoneId(ticket.getStadiumZoneId())
                .build();
    }

    /* =========================
       Reservation -> ReservationWithTicketsDTO
       ========================= */
    public ReservationWithTicketsDTO toReservationWithTicketsDTO(Reservation reservation) {
        if (reservation == null) return null;

        List<TicketResponseDTO> ticketDTOs = reservation.getTickets()
                .stream()
                .map(this::toTicketResponseDTO)
                .toList();

        return ReservationWithTicketsDTO.builder()
                .reservationId(reservation.getId())
                .matchId(reservation.getMatchId())
                .stadiumZone(reservation.getStadiumZoneName())
                .quantity(reservation.getQuantity())
                .totalPrice(reservation.getTotalPrice())
                .status(reservation.getStatus())
                .tickets(ticketDTOs)
                .porte(reservation.getPorte())
                .stadiumZoneId(reservation.getMatchZonePricingId())
                .build();
    }
}

