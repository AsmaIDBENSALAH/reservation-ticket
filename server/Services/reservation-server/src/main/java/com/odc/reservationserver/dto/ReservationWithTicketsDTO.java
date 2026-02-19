package com.odc.reservationserver.dto;

import com.odc.reservationserver.enums.ReservationStatus;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationWithTicketsDTO {

    private UUID reservationId;

    private UUID matchId;

    private String stadiumZone;

    private UUID stadiumZoneId;

    private String porte;

    private int quantity;

    private BigDecimal totalPrice;

    private ReservationStatus status;

    private List<TicketResponseDTO> tickets;
}
