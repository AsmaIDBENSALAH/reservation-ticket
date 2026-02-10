package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.Stadium;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface StadiumRepository extends JpaRepository<Stadium, UUID> {

    Page<Stadium> findByCity_Id(UUID cityId, Pageable pageable);

    Page<Stadium> findByCountry_Id(UUID countryId, Pageable pageable);

    Page<Stadium> findByCity_IdAndCountry_Id(UUID cityId, UUID countryId, Pageable pageable);

}