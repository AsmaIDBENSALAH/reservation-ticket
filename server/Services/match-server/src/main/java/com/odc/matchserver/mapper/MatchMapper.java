package com.odc.matchserver.mapper;

import com.odc.matchserver.dto.match.MatchDetailsDTO;
import com.odc.matchserver.dto.match.MatchRequestDTO;
import com.odc.matchserver.dto.match.MatchResponseDTO;
import com.odc.matchserver.dto.match.MatchZoneDTO;
import com.odc.matchserver.dto.stadium.StadiumSummaryDTO;
import com.odc.matchserver.dto.team.TeamSummaryDTO;
import com.odc.matchserver.entities.*;
import com.odc.matchserver.enums.MatchStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MatchMapper {

        // DTO -> Entity
        public static Match toEntity(
                        MatchRequestDTO dto,
                        Stadium stadium,
                        Team homeTeam,
                        Team awayTeam,
                        Competition competition) {
                if (dto == null)
                        return null;

                return Match.builder()
                                .dateTime(dto.getDateTime())
                                .status(MatchStatus.valueOf(dto.getStatus())) // String -> Enum
                                .matchNumber(dto.getMatchNumber())
                                .attendance(dto.getAttendance())
                                .referee(dto.getReferee())
                                .matchImageUrl(dto.getMatchImageUrl())
                                .stadium(stadium)
                                .homeTeam(homeTeam)
                                .awayTeam(awayTeam)
                                .competition(competition)
                                .active(true) // actif par défaut
                                .build();
                // createdAt, updatedAt, createdBy, updatedBy sont gérés automatiquement par JPA
        }

        // Entity -> DTO
        public MatchResponseDTO toResponseDTO(Match match) {
                if (match == null)
                        return null;

                return new MatchResponseDTO(
                                match.getId(),
                                match.getDateTime(),
                                match.getStatus().name(),
                                match.getMatchNumber(),
                                match.getAttendance(),
                                match.getReferee(),
                                match.getMatchImageUrl(),
                                match.getStadium() != null ? new StadiumSummaryDTO(
                                                match.getStadium().getId(),
                                                match.getStadium().getName(),
                                                match.getStadium().getAddress(),
                                                match.getStadium().getCapacity()) : null,

                                match.getHomeTeam() != null ? new TeamSummaryDTO(
                                                match.getHomeTeam().getId(),
                                                match.getHomeTeam().getName(),
                                                match.getHomeTeam().getLogoUrl(),
                                                match.getHomeTeam().getAbbreviation()) : null,

                                match.getAwayTeam() != null ? new TeamSummaryDTO(
                                                match.getAwayTeam().getId(),
                                                match.getAwayTeam().getName(),
                                                match.getAwayTeam().getLogoUrl(),
                                                match.getAwayTeam().getAbbreviation()) : null,

                                match.getCompetition() != null ? match.getCompetition().getId() : null,
                                match.getZonePricings() != null
                                                ? match.getZonePricings()
                                                                .stream()
                                                                .map(MatchZonePricingMapper::toResponseDTO)
                                                                .collect(Collectors.toList())
                                                : null,
                                // ---------- HISTORIQUE ----------
                                match.getCreatedAt(),
                                match.getUpdatedAt(),
                                match.getCreatedBy(),
                                match.getUpdatedBy(),
                                match.isActive());
        }

        public MatchDetailsDTO toMatchDetailsDTO(Match match) {
                if (match == null)
                        return null;

                List<MatchZoneDTO> zones = match.getZonePricings()
                                .stream()
                                .map(this::toMatchZoneDTO)
                                .toList();

                return MatchDetailsDTO.builder()
                                .matchId(match.getId())
                                .date(match.getDateTime())
                                .address(match.getStadium() != null ? match.getStadium().getAddress() : null)
                                .stadeName(match.getStadium() != null ? match.getStadium().getName() : null) // ✅
                                .competition(match.getCompetition() != null ? match.getCompetition().getName() : null)
                                .currency(match.getCurrency())
                                .homeTeam(match.getHomeTeam() != null ? match.getHomeTeam().getName() : null) // ✅
                                .awayTeam(match.getAwayTeam() != null ? match.getAwayTeam().getName() : null) // ✅
                                .zones(zones)
                                .build();
        }

        private MatchZoneDTO toMatchZoneDTO(MatchZonePricing zone) {
                return MatchZoneDTO.builder()
                                .zoneId(zone.getId())
                                .zoneName(zone.getZone().getName())
                                .availableSeats(zone.getAvailableSeats())
                                .price(zone.getPrice())
                                .porte(zone.getZone().getPorte())
                                .build();
        }
}
