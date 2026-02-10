package com.odc.matchserver.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
@Entity
@Table(name = "stadiums")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stadium {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String address;

    // Ville du stade
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    // Pays du stade
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private Country country;

    @Column(nullable = false)
    private Integer capacity;



    @Column(name = "construction_year")
    private Integer constructionYear;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "stadium", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<StadiumZone> zones = new ArrayList<>();

    @OneToMany(mappedBy = "stadium")
    @Builder.Default
    private List<Match> matches = new ArrayList<>();

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