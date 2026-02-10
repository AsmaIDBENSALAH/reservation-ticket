package com.odc.matchserver.controller;

import com.odc.matchserver.dto.CountryRequestDTO;
import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.services.CountryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/countries")
@RequiredArgsConstructor
public class CountryController {

    private final CountryService countryService;

    // ----------------- GET ALL COUNTRIES (LIST) -----------------
    @GetMapping("/all")
    public List<CountryResponseDTO> getAllCountries() {
        return countryService.getAllCountries();
    }

    // ----------------- GET ALL COUNTRIES (PAGINATED) -----------------
    @GetMapping
    public Page<CountryResponseDTO> getAllCountries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy
    ) {
        return countryService.getAllCountries(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    // ----------------- GET COUNTRY BY ID -----------------
    @GetMapping("/{id}")
    public CountryResponseDTO getCountryById(@PathVariable UUID id) {
        return countryService.getCountryById(id);
    }

    // ----------------- CREATE COUNTRY -----------------
    @PostMapping
    public CountryResponseDTO createCountry(
            @RequestBody CountryRequestDTO dto,
            @RequestParam Continent continent
    ) {
        return countryService.createCountry(dto, continent);
    }

    // ----------------- UPDATE COUNTRY -----------------
    @PutMapping("/{id}")
    public CountryResponseDTO updateCountry(
            @PathVariable UUID id,
            @RequestBody CountryRequestDTO dto,
            @RequestParam Continent continent
    ) {
        return countryService.updateCountry(id, dto, continent);
    }

    // ----------------- DELETE COUNTRY (SOFT DELETE) -----------------
    @DeleteMapping("/{id}")
    public void deleteCountry(@PathVariable UUID id) {
        countryService.deleteCountry(id);
    }
}
