package com.odc.matchserver.dto.stadium;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StadiumSummaryDTO {
    private UUID id;
    private String name;
    private String address;
    private Integer capacity;
}