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
public class Team {

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

    // ---------- HISTORIQUE ----------
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

    private boolean active = true; // Pour soft-delete

}
