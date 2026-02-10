package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {

    Page<Team> findAllByActiveTrue(Pageable pageable);

    Optional<Team> findByIdAndActiveTrue(UUID id);
}
