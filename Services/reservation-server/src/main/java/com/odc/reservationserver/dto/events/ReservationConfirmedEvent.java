package com.odc.reservationserver.dto.events;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationConfirmedEvent {

    private UUID reservationId;
    private String userId;
    private String userName;
    private String userEmail;
    private UUID matchId;
    private UUID stadiumZoneId;
    private String stadiumZoneName;
    private int quantity;
    private double totalPrice;
    private String status;

    // ✅ Nouvelles infos miroir
    private String currency;
    private String homeTeam;
    private String awayTeam;
    private String competition;

    private  String stadeName;

    private LocalDateTime matchDate;

}