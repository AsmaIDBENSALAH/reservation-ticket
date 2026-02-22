package com.odc.matchserver.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "cities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class City extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name; // Nom de la ville, ex: Milan, Udine, Casablanca

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country; // Le pays auquel appartient la ville


    private boolean active = true; // Pour soft-delete

}
