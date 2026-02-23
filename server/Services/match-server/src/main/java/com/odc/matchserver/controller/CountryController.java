package com.odc.matchserver.controller;

import com.odc.matchserver.dto.CountryRequestDTO;
import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.services.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

import java.util.UUID;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    // ----------------- GET ALL COUNTRIES (PAGINATED) -----------------
    @GetMapping
    public Page<CountryResponseDTO> getAllCountries(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return countryService.getAllCountries(pageable);
    }

    // ----------------- GET COUNTRY BY ID -----------------
    @GetMapping("/{id}")
    public CountryResponseDTO getCountryById(@PathVariable UUID id) {
        return countryService.getCountryById(id);
    }

    // ----------------- CREATE COUNTRY -----------------
    @PostMapping
    public CountryResponseDTO createCountry(
            @RequestBody CountryRequestDTO dto) {
        return countryService.createCountry(dto);
    }

    // ----------------- UPDATE COUNTRY -----------------
    @PutMapping("/{id}")
    public CountryResponseDTO updateCountry(
            @PathVariable UUID id,
            @RequestBody CountryRequestDTO dto) {
        return countryService.updateCountry(id, dto);
    }

    // ----------------- DELETE COUNTRY (SOFT DELETE) -----------------
    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable UUID id) {
        countryService.deleteCountry(id);
    }
}
