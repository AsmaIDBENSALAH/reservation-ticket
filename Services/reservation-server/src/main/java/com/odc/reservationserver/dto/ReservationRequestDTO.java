package com.odc.reservationserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationRequestDTO {
    private UUID matchId;
    private String userId;
    private String userName;
    private String userEmail;

    // Cet ID doit correspondre à l'ID du "MatchZonePricing"
    // récupéré via MatchDetailsDTO.getZones()
    private UUID matchZonePricingId;

    private int quantity;
    private String stripeToken;


}