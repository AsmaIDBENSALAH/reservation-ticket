package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.dto.ReservationWithTicketsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ReservationService {
    Page<ReservationResponseDTO> getAllReservations(Pageable pageable);

    void confirmReservation(UUID reservationId);

    void cancelReservation(UUID reservationId);
}
