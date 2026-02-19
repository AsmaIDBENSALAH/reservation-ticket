package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.competition.CompetitionRequestDTO;
import com.odc.matchserver.dto.competition.CompetitionResponseDTO;
import com.odc.matchserver.entities.Competition;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.enums.Continent;

import java.util.List;
import java.util.stream.Collectors;

public class CompetitionMapper {

    // DTO -> Entity
    public static Competition toEntity(
            CompetitionRequestDTO dto,
            Country country,
            Continent continent,
            List<Country> countries
    ) {
        if (dto == null) return null;

        return Competition.builder()
                .name(dto.getName())
                .abbreviation(dto.getAbbreviation())
                .logoUrl(dto.getLogoUrl())
                .description(dto.getDescription())
                .teamType(dto.getTeamType())
                .scope(dto.getScope())
                .country(country)       // si NATIONAL
                .continent(continent)   // si CONTINENTAL
                .countries(countries)   // si REGIONAL
                // Historique géré automatiquement par JPA @CreatedDate / @LastModifiedDate
                .active(true)
                .build();
    }

    // Entity -> DTO
    public static CompetitionResponseDTO toResponseDTO(Competition competition) {
        if (competition == null) return null;

        return CompetitionResponseDTO.builder()
                .id(competition.getId())
                .name(competition.getName())
                .abbreviation(competition.getAbbreviation())
                .logoUrl(competition.getLogoUrl())
                .description(competition.getDescription())
                .teamType(competition.getTeamType())
                .scope(competition.getScope())
                .country(
                        competition.getCountry() != null
                                ? CountryMapper.toResponseDTO(competition.getCountry())
                                : null
                )
                .continent(
                        competition.getContinent() != null
                                ? competition.getContinent() // ou getDisplayName() si tu as un displayName
                                : null
                )
                .countries(
                        competition.getCountries() != null
                                ? competition.getCountries()
                                .stream()
                                .map(CountryMapper::toResponseDTO)
                                .collect(Collectors.toList())
                                : null
                )
                .createdAt(competition.getCreatedAt())
                .updatedAt(competition.getUpdatedAt())
                .createdBy(competition.getCreatedBy())
                .updatedBy(competition.getUpdatedBy())
                .active(competition.isActive())
                .build();
    }
}
