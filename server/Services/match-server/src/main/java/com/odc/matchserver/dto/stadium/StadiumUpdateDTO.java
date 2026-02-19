package com.odc.matchserver.dto.stadium;

import jakarta.validation.constraints.Min;
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
public class StadiumUpdateDTO {

    private UUID id;

    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;

    private String address;

    private UUID cityId;

    private UUID countryId;

    @Min(value = 1, message = "La capacité doit être d'au moins 1")
    private Integer capacity;

    @Min(value = 1800, message = "L'année de construction doit être supérieure à 1800")
    private Integer constructionYear;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;
}