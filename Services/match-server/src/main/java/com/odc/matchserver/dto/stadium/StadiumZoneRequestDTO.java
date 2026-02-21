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

import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StadiumZoneRequestDTO {

    @NotBlank(message = "Le nom de la zone est obligatoire")
    @Size(max = 50, message = "Le nom ne peut pas dépasser 50 caractères")
    private String name;

    @NotNull(message = "La capacité est obligatoire")
    @Min(value = 1, message = "La capacité doit être d'au moins 1")
    private Integer capacity;

    @Size(max = 200, message = "La description ne peut pas dépasser 200 caractères")
    private String description;
    @NotNull(message = "La porte est obligatoire")
    private String porte;

}
