package com.odc.reservationserver.repository;

import com.odc.reservationserver.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    @Query("""
      SELECT t.seatNumber
      FROM Ticket t
      WHERE t.matchId = :matchId
        AND t.stadiumZoneId = :stadiumZoneId
        AND t.status = 'VALID'
    """)
    List<Integer> findOccupiedSeatNumbers(UUID matchId, UUID stadiumZoneId);

    List<Ticket> findByReservationId(UUID reservationId);
}
