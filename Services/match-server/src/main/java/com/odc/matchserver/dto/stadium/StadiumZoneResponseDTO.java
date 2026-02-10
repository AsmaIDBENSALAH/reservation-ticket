package com.odc.matchserver.dto.stadium;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StadiumZoneResponseDTO {

    private UUID id;
    private String name;
    private Integer capacity;
    private String description;
    private StadiumMinimalDTO stadium;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
