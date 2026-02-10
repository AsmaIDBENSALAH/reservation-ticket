package com.odc.matchserver.dto.match;
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
    private List<MatchZoneDTO> zones;
}