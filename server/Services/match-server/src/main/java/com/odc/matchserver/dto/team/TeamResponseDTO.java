package com.odc.matchserver.dto.team;


import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.enums.TeamType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;
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
public class TeamResponseDTO {

    private UUID id;
    private String name;
    private CountryResponseDTO country;
    private String logoUrl;
    private String abbreviation;
    private TeamType type;
    private Integer foundingYear;
    private String description;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
