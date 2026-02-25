package com.odc.matchserver.dto.team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamSummaryDTO {
    private UUID id;
    private String name;
    private String logoUrl;
    private String abbreviation;
}