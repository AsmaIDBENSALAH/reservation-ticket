package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.MatchZonePricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MatchZonePricingRepository extends JpaRepository<MatchZonePricing, UUID> {
    Optional<MatchZonePricing> findByMatch_IdAndZone_Id(UUID matchId, UUID zoneId);

}
