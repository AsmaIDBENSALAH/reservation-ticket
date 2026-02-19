package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.stadium.*;
import com.odc.matchserver.entities.Stadium;
import com.odc.matchserver.entities.StadiumZone;

public class StadiumZoneMapper {

    // DTO -> Entity
    public static StadiumZone toEntity(StadiumZoneRequestDTO dto, Stadium stadium) {
        if (dto == null) return null;

        return StadiumZone.builder()
                .name(dto.getName())
                .capacity(dto.getCapacity())
                .description(dto.getDescription())
                .stadium(stadium)
                .active(true) // actif par défaut
                .build();
        // createdAt, updatedAt, createdBy, updatedBy sont gérés automatiquement par JPA
    }

    // Entity -> MinimalDTO
    public static StadiumZoneMinimalDTO toMinimalDTO(StadiumZone zone) {
        if (zone == null) return null;

        return StadiumZoneMinimalDTO.builder()
                .id(zone.getId())
                .name(zone.getName())
                .capacity(zone.getCapacity())
                .description(zone.getDescription())
                // ---------- HISTORIQUE ----------
                .createdAt(zone.getCreatedDate())
                .updatedAt(zone.getLastModifiedDate())
                .createdBy(zone.getCreatedBy())
                .updatedBy(zone.getLastModifiedBy())
                .active(zone.isActive())
                .build();
    }

    // Entity -> ResponseDTO
    public static StadiumZoneResponseDTO toResponseDTO(StadiumZone zone) {
        if (zone == null) return null;

        return StadiumZoneResponseDTO.builder()
                .id(zone.getId())
                .name(zone.getName())
                .capacity(zone.getCapacity())
                .description(zone.getDescription())
                .stadium(
                        zone.getStadium() != null
                                ? StadiumMapper.toMinimalDTO(zone.getStadium())
                                : null
                )
                // ---------- HISTORIQUE ----------
                .createdAt(zone.getCreatedDate())
                .updatedAt(zone.getLastModifiedDate())
                .createdBy(zone.getCreatedBy())
                .updatedBy(zone.getLastModifiedBy())
                .active(zone.isActive())
                .build();
    }

    public static void updateEntity(StadiumZone zone, StadiumZoneUpdateDTO dto) {
        if (zone == null || dto == null) return;

        if (dto.getName() != null) {
            zone.setName(dto.getName());
        }

        if (dto.getCapacity() != null) {
            zone.setCapacity(dto.getCapacity());
        }

        if (dto.getDescription() != null) {
            zone.setDescription(dto.getDescription());
        }
    }
}
