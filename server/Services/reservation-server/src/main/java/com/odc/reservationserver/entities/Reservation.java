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

    private UUID userId;   // venant du user-service
    private UUID matchId;  // venant du match-service

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;
    // PENDING, CONFIRMED, CANCELLED, EXPIRED

    private UUID stadiumZoneId; // VIP, NORMAL, VIRAGE
    private String stadiumZone;
    private String porte;

    private int quantity; // nombre de sièges demandés

    private BigDecimal totalPrice;

    private LocalDateTime reservationDate;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}

