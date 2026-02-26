package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.UUID;

public interface ReservationService {
    Page<ReservationResponseDTO> getAllReservations(Pageable pageable);

    ReservationResponseDTO createReservation(ReservationRequestDTO dto);

    Page<ReservationResponseDTO> getReservationsByUserId(String userId, Pageable pageable);

    @Scheduled(fixedRate = 3600000)
    void expirePassedMatches();

    void confirmReservation(UUID reservationId);

    void cancelReservation(UUID reservationId);
}
