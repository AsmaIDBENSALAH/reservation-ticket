package com.odc.matchserver.repositories;

import com.odc.matchserver.entities.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CityRepository extends JpaRepository<City, UUID> {
    Page<City> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);

    Optional<City> findByName(String name);

    Optional<City> findById(UUID idCity);

    List<City> findByCountryId(UUID countryId);
}