package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.CountryRequestDTO;
import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.enums.Continent;

public class CountryMapper {

    // DTO -> Entity
    public static Country toEntity(CountryRequestDTO dto, Continent continent) {
        if (dto == null) return null;

        return Country.builder()
                .name(dto.getName())
                .continent(continent) // injecté depuis le service
                .active(true)         // actif par défaut
                .build();
        // createdAt, updatedAt, createdBy, updatedBy sont gérés automatiquement par JPA
    }

    // Entity -> DTO
    public static CountryResponseDTO toResponseDTO(Country country) {
        if (country == null) return null;

        return CountryResponseDTO.builder()
                .id(country.getId())
                .name(country.getName())
                .continentName(country.getContinent())
                // ---------- HISTORIQUE ----------
                .createdAt(country.getCreatedDate())
                .updatedAt(country.getLastModifiedDate())
                .createdBy(country.getCreatedBy())
                .updatedBy(country.getLastModifiedBy())
                .active(country.isActive())
                .build();
    }
}
