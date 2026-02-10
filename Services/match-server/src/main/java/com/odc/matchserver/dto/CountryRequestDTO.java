package com.odc.matchserver.dto;

import com.odc.matchserver.enums.Continent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountryRequestDTO {
    private String name;
    private Continent continentName;
}
