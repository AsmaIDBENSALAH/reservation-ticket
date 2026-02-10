package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.CityRequestDTO;
import com.odc.matchserver.dto.CityResponseDTO;
import com.odc.matchserver.entities.City;
import com.odc.matchserver.entities.Country;

public class CityMapper {

    // DTO -> Entity
    public static City toEntity(CityRequestDTO dto, Country country) {
        if (dto == null) return null;

        return City.builder()
                .name(dto.getName())
                .country(country) // on injecte l'entité Country depuis le service
                .active(true)     // active par défaut
                .build();
        // createdAt, updatedAt, createdBy, updatedBy sont gérés automatiquement par JPA/Hibernate
    }

    // Entity -> DTO
    public static CityResponseDTO toResponseDTO(City city) {
        if (city == null) return null;

        return CityResponseDTO.builder()
                .id(city.getId())
                .name(city.getName())
                .countryName(
                        city.getCountry() != null
                                ? city.getCountry().getName()
                                : null
                )
                // ---------- HISTORIQUE ----------
                .createdAt(city.getCreatedAt())
                .updatedAt(city.getUpdatedAt())
                .createdBy(city.getCreatedBy())
                .updatedBy(city.getUpdatedBy())
                .active(city.isActive())
                .build();
    }
}
