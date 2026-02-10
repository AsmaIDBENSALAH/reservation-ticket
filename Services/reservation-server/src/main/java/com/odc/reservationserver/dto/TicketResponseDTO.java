package com.odc.reservationserver.dto;

import com.odc.reservationserver.enums.TicketStatus;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketResponseDTO {

    private UUID ticketId;

    private UUID matchId;

    private String stadiumZone;
    private UUID stadiumZoneId;
    private Integer seatNumber;
    private String porte;

    private BigDecimal price;

    private String qrCode;

    private TicketStatus status;
}
