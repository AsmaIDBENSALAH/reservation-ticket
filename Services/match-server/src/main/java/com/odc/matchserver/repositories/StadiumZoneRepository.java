package com.odc.matchserver.repositories;


import com.odc.matchserver.entities.Stadium;
import com.odc.matchserver.entities.StadiumZone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;
@Repository
public interface StadiumZoneRepository extends JpaRepository<StadiumZone, UUID> {

    Page<StadiumZone> findByStadium(Stadium stadium, Pageable pageable);

}