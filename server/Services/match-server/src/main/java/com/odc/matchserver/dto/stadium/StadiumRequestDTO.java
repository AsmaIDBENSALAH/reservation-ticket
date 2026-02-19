package com.odc.matchserver.dto.stadium;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class StadiumRequestDTO {

    @NotBlank(message = "Le nom du stade est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String name;

    @NotBlank(message = "L'adresse est obligatoire")
    private String address;

    @NotNull(message = "La ville est obligatoire")
    private UUID cityId;

    @NotNull(message = "Le pays est obligatoire")
    private UUID countryId;

    @NotNull(message = "La capacité est obligatoire")
    @Min(value = 1, message = "La capacité doit être d'au moins 1")
    private Integer capacity;

    @Min(value = 1800, message = "L'année de construction doit être supérieure à 1800")
    private Integer constructionYear;

    @Size(max = 500, message = "La description ne peut pas dépasser 500 caractères")
    private String description;

    @Valid
    private List<StadiumZoneRequestDTO> zones;
}