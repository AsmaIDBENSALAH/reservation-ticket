package com.odc.matchserver.dto.stadium;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StadiumMinimalDTO {

    private UUID id;
    private String name;
    private String address;
    private Integer capacity;
    private String cityName;
    private String countryName;
    private List<StadiumZoneMinimalDTO> zones;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
