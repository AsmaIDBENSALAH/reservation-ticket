package com.odc.matchserver.dto;

import com.odc.matchserver.enums.Continent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.UUID;
import com.odc.matchserver.enums.Continent;
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
public class CountryResponseDTO {

    private UUID id;

    private String name;

    private Continent continentName;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String createdBy;

    private String updatedBy;

    private boolean active;
}
