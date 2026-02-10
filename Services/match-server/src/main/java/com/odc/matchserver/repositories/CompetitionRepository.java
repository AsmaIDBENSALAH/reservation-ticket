package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.Competition;
import com.odc.matchserver.enums.CompetitionScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.odc.matchserver.enums.Continent;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, UUID> {

    Page<Competition> findByActiveTrue(Pageable pageable);

    Page<Competition> findByActiveTrueAndScopeAndContinent(CompetitionScope scope, Continent continent, Pageable pageable);

    Page<Competition> findByActiveTrueAndScopeAndCountryId(CompetitionScope scope, UUID countryId, Pageable pageable);

    Page<Competition> findByActiveTrueAndScopeAndCountriesIdIn(CompetitionScope scope, List<UUID> countryIds, Pageable pageable);
    Page<Competition> findByActiveTrueAndScope(CompetitionScope scope, Pageable pageable); // international


}
