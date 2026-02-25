package com.odc.matchserver.dto.match;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.odc.matchserver.dto.stadium.StadiumSummaryDTO;
import com.odc.matchserver.dto.team.TeamSummaryDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchResponseDTO {
    private UUID id;
    private LocalDateTime dateTime;
    private String status;
    private String matchNumber;
    private Integer attendance;
    private String referee;
    private String matchImageUrl;
    private StadiumSummaryDTO stadium;
    private TeamSummaryDTO homeTeam;
    private TeamSummaryDTO awayTeam;
    private UUID competitionId;
    private List<MatchZonePricingResponseDTO> zonePricings;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
