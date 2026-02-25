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
    // Pagination et seulement les villes actives
    Page<City> findByActiveTrue(Pageable pageable);

    Optional<City> findById(UUID idCity);


    Page<City> findByActiveTrueAndNameContainingIgnoreCase(String keyword, Pageable pageable);

}
