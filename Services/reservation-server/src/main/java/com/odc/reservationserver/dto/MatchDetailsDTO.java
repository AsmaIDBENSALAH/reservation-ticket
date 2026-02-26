package com.odc.reservationserver.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class MatchDetailsDTO {
    private UUID matchId;


    private LocalDateTime date;
    private String address;
    private String competition;
    private String homeTeam;
    private String awayTeam;
    private List<MatchZoneDTO> zones;
    private String currency;

    private String stadeName;

    private LocalDateTime matchDate;
}

