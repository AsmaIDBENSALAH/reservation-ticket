package com.odc.reservationserver.dto;

import com.odc.reservationserver.enums.ReservationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {

    private UUID reservationId;

    private UUID userId;

    private UUID matchId;

    private String stadiumZone;
    private UUID stadiumZoneId;

    private int quantity;

    private BigDecimal totalPrice;

    private ReservationStatus status;

    private LocalDateTime reservationDate;
}
