package com.odc.matchserver.dto.match;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchZonePricingRequestDTO {
    private BigDecimal price;
    private Integer availableSeats;
    private UUID zoneId;

}
