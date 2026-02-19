package com.odc.matchserver.dto.match;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchRequestDTO {
    private LocalDateTime dateTime;
    private String status; // "SCHEDULED", "FINISHED", etc.
    private String matchNumber;
    private Integer attendance;
    private String referee;
    private String matchImageUrl;
    private UUID stadiumId;
    private UUID homeTeamId;
    private UUID awayTeamId;
    private UUID competitionId;
    private List<MatchZonePricingRequestDTO> zonePricings;
}

