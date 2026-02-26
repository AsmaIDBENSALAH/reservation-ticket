package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.stadium.StadiumMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumUpdateDTO;
import com.odc.matchserver.entities.City;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.entities.Stadium;
import com.odc.matchserver.entities.StadiumZone;

import java.util.List;
import java.util.stream.Collectors;

public class StadiumMapper {

    // DTO -> Entity (CREATE)
    public static Stadium toEntity(
            StadiumRequestDTO dto,
            City city,
            Country country
    ) {
        if (dto == null) return null;

        Stadium stadium = Stadium.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .city(city)
                .country(country)
                .capacity(dto.getCapacity())
                .constructionYear(dto.getConstructionYear())
                .description(dto.getDescription())
                .active(true) // actif par défaut
                .build();

        return stadium;
    }

    // Entity -> MinimalDTO
    public static StadiumMinimalDTO toMinimalDTO(Stadium stadium) {
        if (stadium == null) return null;

        return StadiumMinimalDTO.builder()
                .id(stadium.getId())
                .name(stadium.getName())
                .address(stadium.getAddress())
                .capacity(stadium.getCapacity())
                .cityName(stadium.getCity() != null ? stadium.getCity().getName() : null)
                .countryName(stadium.getCountry() != null ? stadium.getCountry().getName() : null)
                .zones(stadium.getZones() != null
                        ? stadium.getZones().stream()
                        .map(StadiumZoneMapper::toMinimalDTO)
                        .collect(Collectors.toList())
                        : null)
                // ---------- HISTORIQUE ----------
                .createdAt(stadium.getCreatedAt())
                .updatedAt(stadium.getUpdatedAt())
                .createdBy(stadium.getCreatedBy())
                .updatedBy(stadium.getUpdatedBy())
                .active(stadium.isActive())
                .build();
    }

    // UPDATE (partial)
    public static void updateEntity(
            Stadium stadium,
            StadiumUpdateDTO dto,
            City city,
            Country country
    ) {
        if (dto.getName() != null)
            stadium.setName(dto.getName());

        if (dto.getAddress() != null)
            stadium.setAddress(dto.getAddress());

        if (dto.getCityId() != null)
            stadium.setCity(city);

        if (dto.getCountryId() != null)
            stadium.setCountry(country);

        if (dto.getCapacity() != null)
            stadium.setCapacity(dto.getCapacity());

        if (dto.getConstructionYear() != null)
            stadium.setConstructionYear(dto.getConstructionYear());

        if (dto.getDescription() != null)
            stadium.setDescription(dto.getDescription());
    }
}
