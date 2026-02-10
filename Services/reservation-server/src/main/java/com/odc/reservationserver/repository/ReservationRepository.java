package com.odc.reservationserver.repository;

import com.odc.reservationserver.entities.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    Page<Reservation> findByUserId(UUID userId, Pageable pageable);

}