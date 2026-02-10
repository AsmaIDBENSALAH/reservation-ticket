package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.Match;
import com.odc.matchserver.entities.Stadium;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface MatchRepository extends JpaRepository<Match, UUID> {

    // Filtrer par competition
    Page<Match> findByCompetition_Id(UUID competitionId, Pageable pageable);

    // Filtrer par stade
    Page<Match> findByStadium_Id(UUID stadiumId, Pageable pageable);

    // Filtrer par date
    Page<Match> findByDateTimeBetween(LocalDateTime from, LocalDateTime to, Pageable pageable);

    // Vérifier si le stade est déjà occupé à une date donnée
    boolean existsByStadiumAndDateTime(Stadium stadium, LocalDateTime dateTime);
}
