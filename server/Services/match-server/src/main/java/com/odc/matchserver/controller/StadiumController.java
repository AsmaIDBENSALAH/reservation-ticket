package com.odc.matchserver.controller;

import com.odc.matchserver.dto.stadium.StadiumMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumUpdateDTO;
import com.odc.matchserver.services.StadiumService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/stadiums")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class StadiumController {

    private final StadiumService stadiumService;

    // ---------------- GET ALL PAGINATED ----------------
    @GetMapping
    public ResponseEntity<Page<StadiumMinimalDTO>> getAll(Pageable pageable) {
        return ResponseEntity.ok(stadiumService.getAll(pageable));
    }

    // ---------------- GET BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<StadiumMinimalDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(stadiumService.getById(id));
    }

    // ---------------- CREATE ----------------
    @PostMapping
    public ResponseEntity<StadiumMinimalDTO> create(@RequestBody StadiumRequestDTO dto) {
        System.out.println(dto);
        StadiumMinimalDTO created = stadiumService.create(dto);
        return ResponseEntity.ok(created);
    }

    // ---------------- UPDATE ----------------
    @PutMapping
    public ResponseEntity<StadiumMinimalDTO> update(@RequestBody StadiumUpdateDTO dto) {
        StadiumMinimalDTO updated = stadiumService.update(dto);
        return ResponseEntity.ok(updated);
    }

    // ---------------- DELETE (SOFT DELETE) ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        stadiumService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ---------------- FILTER BY CITY ----------------
    @GetMapping("/city/{cityId}")
    public ResponseEntity<Page<StadiumMinimalDTO>> getByCity(
            @PathVariable UUID cityId, Pageable pageable) {
        return ResponseEntity.ok(stadiumService.getByCity(cityId, pageable));
    }

    // ---------------- FILTER BY COUNTRY ----------------
    @GetMapping("/country/{countryId}")
    public ResponseEntity<Page<StadiumMinimalDTO>> getByCountry(
            @PathVariable UUID countryId, Pageable pageable) {
        return ResponseEntity.ok(stadiumService.getByCountry(countryId, pageable));
    }

    // ---------------- FILTER BY CITY + COUNTRY ----------------
    @GetMapping("/filter")
    public ResponseEntity<Page<StadiumMinimalDTO>> getByCityAndCountry(
            @RequestParam UUID cityId,
            @RequestParam UUID countryId,
            Pageable pageable) {
        return ResponseEntity.ok(stadiumService.getByCityAndCountry(cityId, countryId, pageable));
    }
}