package com.odc.matchserver.dto.match;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchZonePricingResponseDTO {

    private UUID id;
    private BigDecimal price;
    private Integer availableSeats;
    private Integer soldSeats;
    private UUID zoneId;
    private String name;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
