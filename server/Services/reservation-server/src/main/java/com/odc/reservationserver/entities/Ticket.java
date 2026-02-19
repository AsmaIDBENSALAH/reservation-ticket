package com.odc.reservationserver.entities;

import com.odc.reservationserver.enums.TicketStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String qrCode;

    private UUID userId;
    private UUID matchId;
    private UUID stadiumZoneId;
    private String stadiumZone;
    private String porte;

    private Integer seatNumber;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;
    // VALID, USED, EXPIRED

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}
