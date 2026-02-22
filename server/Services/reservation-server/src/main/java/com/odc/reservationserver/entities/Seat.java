package com.odc.reservationserver.entities;

import com.odc.reservationserver.enums.SeatStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "seats",
        uniqueConstraints = @UniqueConstraint(columnNames = {"matchId", "stadiumZone", "seatNumber"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID matchId;

    private UUID stadiumZone; // VIP, NORMAL, VIRAGE

    private Integer seatNumber; // 1, 2, 3, 4... (auto)

    @Enumerated(EnumType.STRING)
    private SeatStatus status; // AVAILABLE, RESERVED
}
