package com.odc.matchserver.entities;

import com.odc.matchserver.enums.CompetitionScope;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.enums.TeamType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "competitions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Competition {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String abbreviation;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    private TeamType teamType;

    @Enumerated(EnumType.STRING)
    private CompetitionScope scope; // NATIONAL, CONTINENTAL, INTERNATIONAL

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    private Country country; 

    @Enumerated(EnumType.STRING)
    private Continent continent; 

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

    private boolean active = true;

    @PrePersist
    @PreUpdate
    private void validateScope() {
        switch (scope) {
            case NATIONAL:
                if (country == null)
                    throw new IllegalStateException("Country must be set for NATIONAL scope");
                if (continent != null)
                    throw new IllegalStateException("Continent must be null for NATIONAL scope");
                break;
            case CONTINENTAL:
                if (continent == null)
                    throw new IllegalStateException("Continent must be set for CONTINENTAL scope");
                if (country != null)
                    throw new IllegalStateException("Country must be null for CONTINENTAL scope");
                break;
            case INTERNATIONAL:
                if (country != null || continent != null)
                    throw new IllegalStateException("Country and continent must be null for INTERNATIONAL scope");
                break;
        }
    }
}