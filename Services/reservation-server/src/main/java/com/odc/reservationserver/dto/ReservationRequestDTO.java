package com.odc.reservationserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDTO {

    private UUID matchId;

    private UUID userId;

    private String porte;

    private String stadiumZone; // VIP, NORMAL, VIRAGE

    private UUID stadiumZoneId;
    private int quantity; // nombre de sièges demandés

    private String stripeToken; // 👈 AJOUTE CECI
}
