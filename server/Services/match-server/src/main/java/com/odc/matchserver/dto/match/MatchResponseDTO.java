package com.odc.matchserver.dto.match;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;



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
    private String stadiumName;
    private UUID homeTeamId;
    private String homeTeamName;
    private String homeTeamAbbreviation;
    private String homeTeamLogoUrl;

    private UUID awayTeamId;
    private String awayTeamName;
    private String awayTeamAbbreviation;
    private String awayTeamLogoUrl;
    private UUID competitionId;
    private String competitionName;
    private String currency;
    private List<MatchZonePricingResponseDTO> zonePricings;

    // ---------- HISTORIQUE ----------
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private boolean active;
}
