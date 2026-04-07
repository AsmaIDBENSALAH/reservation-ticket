package com.odc.reservationserver.dto;

import com.odc.reservationserver.enums.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {

    private UUID reservationId;

    private String userId;
    private String userName;
    private String userEmail;
    private UUID matchId;

    private String stadiumZone;
    private UUID stadiumZoneId;
    private String porte;

    private int quantity;
    private BigDecimal totalPrice;
    private ReservationStatus status;
    private LocalDateTime reservationDate;

    // ✅ Nouvelles infos miroir
    private String currency;
    private String homeTeam;
    private String awayTeam;
    private String competition;
    private String stadeName;
    private LocalDateTime matchDate;
}