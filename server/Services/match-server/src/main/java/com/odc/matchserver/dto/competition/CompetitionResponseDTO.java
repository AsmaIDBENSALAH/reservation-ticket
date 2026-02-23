package com.odc.matchserver.dto.competition;

import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.enums.CompetitionScope;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.enums.TeamType;
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
public class CompetitionResponseDTO {

    private UUID id;
    private String name;
    private String abbreviation;
    private String logoUrl;
    private String description;
    private TeamType teamType;
    private CompetitionScope scope;

    private CountryResponseDTO country; 
    private Continent continent; 

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}