package com.odc.reservationserver.entities;

import com.odc.reservationserver.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String userId;
    private UUID matchId;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status; // PENDING, CONFIRMED, CANCELLED

    // L'ID technique qui lie le Match à la Zone et au Prix dans le match-service
    private UUID matchZonePricingId;
    private String userName;
    private String userEmail;

    // Données "miroir" pour éviter de refaire des appels Feign juste pour l'affichage
    private String stadiumZoneName; // ex: "VIP", "Tribune Nord"
    private String porte;

    private int quantity;
    private BigDecimal totalPrice;
    private LocalDateTime reservationDate;


    private String stripeToken;

    private String currency;
    private String homeTeam;
    private String awayTeam;
    private String competition;

    private String stadeName;
    private LocalDateTime matchDate;
}