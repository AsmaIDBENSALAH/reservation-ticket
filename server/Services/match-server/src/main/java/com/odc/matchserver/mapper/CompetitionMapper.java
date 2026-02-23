package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.entities.Competition;
import com.odc.matchserver.entities.Country;

public class CompetitionMapper {

        public static Competition toEntity(CompetitionRequestDTO dto, Country country) {
                if (dto == null)
                        return null;

                return Competition.builder()
                                .name(dto.getName())
                                .abbreviation(dto.getAbbreviation())
                                .logoUrl(dto.getLogoUrl())
                                .description(dto.getDescription())
                                .teamType(dto.getTeamType())
                                .scope(dto.getScope())
                                .country(country)
                                .continent(dto.getContinent())
                                .active(true)
                                .build();
        }

        public static CompetitionResponseDTO toResponseDTO(Competition competition) {
                if (competition == null)
                        return null;

                return CompetitionResponseDTO.builder()
                                .id(competition.getId())
                                .name(competition.getName())
                                .abbreviation(competition.getAbbreviation())
                                .logoUrl(competition.getLogoUrl())
                                .description(competition.getDescription())
                                .teamType(competition.getTeamType())
                                .scope(competition.getScope())
                                .country(competition.getCountry() != null
                                                ? CountryMapper.toResponseDTO(competition.getCountry())
                                                : null)
                                .continent(competition.getContinent())
                                .createdAt(competition.getCreatedAt())
                                .updatedAt(competition.getUpdatedAt())
                                .createdBy(competition.getCreatedBy())
                                .updatedBy(competition.getUpdatedBy())
                                .active(competition.isActive())
                                .build();
        }
}