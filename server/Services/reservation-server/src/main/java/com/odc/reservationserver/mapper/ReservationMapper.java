package com.odc.reservationserver.mapper;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.entities.Reservation;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


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
                // ✅ Nouvelles infos miroir
                .currency(reservation.getCurrency())
                .homeTeam(reservation.getHomeTeam())
                .awayTeam(reservation.getAwayTeam())
                .competition(reservation.getCompetition())
                .stadeName(reservation.getStadeName())
                .reservationDate(reservation.getReservationDate())
                .build();
    }


}

