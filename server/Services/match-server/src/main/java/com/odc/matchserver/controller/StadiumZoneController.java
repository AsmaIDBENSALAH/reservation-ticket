package com.odc.matchserver.controller;

import com.odc.matchserver.dto.stadium.StadiumZoneMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneUpdateDTO;
import com.odc.matchserver.services.StadiumZoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/stadium-zones")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class StadiumZoneController {

    private final StadiumZoneService stadiumZoneService;

    // ---------------- CREATE ----------------
    @PostMapping("/{stadiumId}")
    public ResponseEntity<StadiumZoneMinimalDTO> create(
            @PathVariable UUID stadiumId,
            @RequestBody StadiumZoneRequestDTO dto
    ) {
        StadiumZoneMinimalDTO created = stadiumZoneService.create(stadiumId, dto);
        return ResponseEntity.ok(created);
    }

    // ---------------- UPDATE ----------------
    @PutMapping
    public ResponseEntity<StadiumZoneMinimalDTO> update(@RequestBody StadiumZoneUpdateDTO dto) {
        StadiumZoneMinimalDTO updated = stadiumZoneService.update(dto);
        return ResponseEntity.ok(updated);
    }

    // ---------------- GET BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<StadiumZoneMinimalDTO> getById(@PathVariable UUID id) {
        StadiumZoneMinimalDTO zone = stadiumZoneService.getById(id);
        return ResponseEntity.ok(zone);
    }

    // ---------------- GET BY STADIUM (PAGINATED) ----------------
    @GetMapping("/stadium/{stadiumId}")
    public ResponseEntity<Page<StadiumZoneMinimalDTO>> getByStadium(
            @PathVariable UUID stadiumId,
            Pageable pageable
    ) {
        Page<StadiumZoneMinimalDTO> zones = stadiumZoneService.getByStadiumId(stadiumId, pageable);
        return ResponseEntity.ok(zones);
    }

    // ---------------- DELETE ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        stadiumZoneService.delete(id);
        return ResponseEntity.noContent().build();
    }
}