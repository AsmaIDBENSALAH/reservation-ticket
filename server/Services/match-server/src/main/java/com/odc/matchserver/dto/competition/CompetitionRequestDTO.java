package com.odc.matchserver.dto.competition;

import com.odc.matchserver.enums.CompetitionScope;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.enums.TeamType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompetitionRequestDTO {

    @NotBlank(message = "Le nom de la compétition est obligatoire")
    private String name;

    private String abbreviation;

    private String logoUrl;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;

    private TeamType teamType;

    private CompetitionScope scope;

    private UUID countryId;

    private Continent continent;

    private List<UUID> countryIds;
}