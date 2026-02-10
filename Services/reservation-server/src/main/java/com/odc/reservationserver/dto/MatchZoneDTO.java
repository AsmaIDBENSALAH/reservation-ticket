package com.odc.reservationserver.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class MatchZoneDTO {
    private UUID zoneId;
    private String zoneName;
    private int availableSeats;
    private BigDecimal price;
}