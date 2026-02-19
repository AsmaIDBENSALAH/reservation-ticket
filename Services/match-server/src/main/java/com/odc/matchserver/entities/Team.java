package com.odc.matchserver.entities;

import com.odc.matchserver.enums.TeamType;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
@Entity
@Table(name = "teams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Team extends Auditable{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    // Pays de l'équipe
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(length = 10)
    private String abbreviation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TeamType type = TeamType.CLUB;

    @Column(name = "founding_year")
    private Integer foundingYear;

    @Column(length = 500)
    private String description;


    private boolean active = true; // Pour soft-delete

}
