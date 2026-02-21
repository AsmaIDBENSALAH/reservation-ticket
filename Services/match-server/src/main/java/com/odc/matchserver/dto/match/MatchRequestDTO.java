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
public class MatchRequestDTO {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dateTime;
    private String status;
    private String matchNumber;
    private Integer attendance;
    private String referee;
    private String matchImageUrl;
    private UUID stadiumId;
    private UUID homeTeamId;

    private UUID awayTeamId;

    private UUID competitionId;
    private String currency;
    private List<MatchZonePricingRequestDTO> zonePricings;
}

