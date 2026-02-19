package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.team.TeamRequestDTO;
import com.odc.matchserver.dto.team.TeamResponseDTO;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.entities.Team;

public class TeamMapper {

    // DTO -> Entity
    public static Team toEntity(TeamRequestDTO dto, Country country) {
        if (dto == null) return null;

        return Team.builder()
                .name(dto.getName())
                .country(country) // injecté depuis le service
                .logoUrl(dto.getLogoUrl())
                .abbreviation(dto.getAbbreviation())
                .type(dto.getType())
                .foundingYear(dto.getFoundingYear())
                .description(dto.getDescription())
                .active(true) // actif par défaut
                .build();
        // createdAt, updatedAt, createdBy, updatedBy sont gérés automatiquement par JPA
    }

    // Entity -> DTO
    public static TeamResponseDTO toResponseDTO(Team team) {
        if (team == null) return null;

        return TeamResponseDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .logoUrl(team.getLogoUrl())
                .abbreviation(team.getAbbreviation())
                .type(team.getType())
                .foundingYear(team.getFoundingYear())
                .description(team.getDescription())
                .country(team.getCountry() != null
                        ? CountryMapper.toResponseDTO(team.getCountry())
                        : null)
                // ---------- HISTORIQUE ----------
                .createdAt(team.getCreatedAt())
                .updatedAt(team.getUpdatedAt())
                .createdBy(team.getCreatedBy())
                .updatedBy(team.getUpdatedBy())
                .active(team.isActive())
                .build();
    }
}
