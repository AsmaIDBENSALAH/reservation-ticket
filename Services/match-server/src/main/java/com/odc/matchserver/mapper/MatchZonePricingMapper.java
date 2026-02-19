package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.match.MatchZonePricingRequestDTO;
import com.odc.matchserver.dto.match.MatchZonePricingResponseDTO;
import com.odc.matchserver.entities.Match;
import com.odc.matchserver.entities.MatchZonePricing;
import com.odc.matchserver.entities.StadiumZone;

public class MatchZonePricingMapper {

    // DTO -> Entity
    public static MatchZonePricing toEntity(
            MatchZonePricingRequestDTO dto,
            Match match,
            StadiumZone zone
    ) {
        if (dto == null) return null;

        return MatchZonePricing.builder()
                .price(dto.getPrice())
                .availableSeats(dto.getAvailableSeats())
                .isActive(dto.getIsActive() != null ? dto.getIsActive() : true)
                .match(match)
                .zone(zone)
                .active(true) // actif par défaut
                .build();
        // createdAt, updatedAt, createdBy, updatedBy gérés automatiquement par JPA
    }

    // Entity -> DTO
    public static MatchZonePricingResponseDTO toResponseDTO(MatchZonePricing entity) {
        if (entity == null) return null;

        return new MatchZonePricingResponseDTO(
                entity.getId(),
                entity.getPrice(),
                entity.getAvailableSeats(),
                entity.getSoldSeats(),
                entity.getIsActive(),
                entity.getZone() != null ? entity.getZone().getId() : null,
                // ---------- HISTORIQUE ----------
                entity.getCreatedDate(),
                entity.getLastModifiedDate(),
                entity.getCreatedBy(),
                entity.getLastModifiedBy(),
                entity.isActive()
        );
    }
}
