package com.odc.matchserver.entities;

import com.odc.matchserver.enums.Continent;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
@Entity
@Table(name = "countries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Country extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name; // Maroc, France, Algérie…

    @Enumerated(EnumType.STRING)
    private Continent continent;



    private boolean active = true; // Pour soft-delete


}
