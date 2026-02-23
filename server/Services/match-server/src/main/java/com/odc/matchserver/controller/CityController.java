package com.odc.matchserver.controller;

import com.odc.matchserver.dto.CityRequestDTO;
import com.odc.matchserver.dto.CityResponseDTO;
import com.odc.matchserver.services.CityService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping("/api/cities")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class CityController {

    private final CityService cityService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<CityResponseDTO> getCities(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy) {
        return cityService.getAllCities(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public CityResponseDTO getCity(@PathVariable UUID id) {
        return cityService.getCityById(id);
    }

    @PostMapping
    public CityResponseDTO createCity(@RequestBody CityRequestDTO dto) {
        return cityService.createCity(dto);
    }

    @PutMapping("/{id}")
    public CityResponseDTO updateCity(@PathVariable UUID id,
            @RequestBody CityRequestDTO dto) {
        return cityService.updateCity(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable UUID id) {
        cityService.deleteCity(id);
    }
}
