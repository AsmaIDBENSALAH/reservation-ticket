package com.odc.reservationserver.controller;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.service.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationServiceImpl reservationService;

    /* =========================
       CREATE RESERVATION
       ========================= */
    @PostMapping
    public ReservationResponseDTO createReservation(
            @RequestBody ReservationRequestDTO dto
    ) {
        return reservationService.createReservation(dto);
    }

    /* =========================
       CONFIRM RESERVATION
       ========================= */
    @PutMapping("/{id}/confirm")
    public void confirmReservation(@PathVariable UUID id) {
        reservationService.confirmReservation(id);
    }

    /* =========================
       CANCEL RESERVATION
       ========================= */
    @PutMapping("/{id}/cancel")
    public void cancelReservation(@PathVariable UUID id) {
        reservationService.cancelReservation(id);
    }

    /* =========================
       GET ALL RESERVATIONS (PAGEABLE)
       ========================= */
    @GetMapping
    public Page<ReservationResponseDTO> getAllReservations(Pageable pageable) {
        return reservationService.getAllReservations(pageable);
    }
}
