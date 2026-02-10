package com.odc.matchserver.dto.team;

import com.odc.matchserver.enums.TeamType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamRequestDTO {

    @NotBlank(message = "Le nom de l'équipe est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;

    private UUID countryId;

    private String logoUrl;

    @Size(max = 10, message = "L'abréviation ne peut pas dépasser 10 caractères")
    private String abbreviation;

    private TeamType type = TeamType.CLUB;

    private Integer foundingYear;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;
}