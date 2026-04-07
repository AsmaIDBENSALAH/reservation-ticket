package com.odc.reservationserver.controller;

import com.odc.reservationserver.dto.ReservationRequestDTO;
import com.odc.reservationserver.dto.ReservationResponseDTO;
import com.odc.reservationserver.service.ReservationService;
import com.odc.reservationserver.service.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /* =========================
       CREATE RESERVATION
       ========================= */
    @PostMapping
    public ReservationResponseDTO createReservation(
            @RequestBody ReservationRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt  // ✅ Fonctionne même derrière une Gateway
    ) {
        String userId = jwt.getSubject(); // ID Keycloak
        dto.setUserId(userId);
        dto.setUserEmail(jwt.getClaimAsString("email"));
        dto.setUserName(jwt.getClaimAsString("given_name") + " " +
                jwt.getClaimAsString("family_name"));
        return reservationService.createReservation(dto);
    }


    @GetMapping("/my-history")
    public Page<ReservationResponseDTO> getMyReservations(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "reservationDate") String sortBy
    ) {
        String userId = jwt.getSubject(); // ID Keycloak
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return reservationService.getReservationsByUserId(userId, pageable);
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
