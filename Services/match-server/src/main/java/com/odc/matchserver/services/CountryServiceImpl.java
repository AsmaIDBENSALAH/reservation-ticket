package com.odc.matchserver.services;


import com.odc.matchserver.dto.CountryRequestDTO;
import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.enums.Continent;
import com.odc.matchserver.exceptions.CountryNotFoundException;
import com.odc.matchserver.mapper.CountryMapper;
import com.odc.matchserver.repositories.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    // ----------------- GET ALL COUNTRIES -----------------
    @Override
    public List<CountryResponseDTO> getAllCountries() {
        return countryRepository.findAll()
                .stream()
                .map(CountryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // ----------------- GET ALL COUNTRIES PAGINATED -----------------
    @Override
    public Page<CountryResponseDTO> getAllCountries(Pageable pageable) {
        return countryRepository.findAll(pageable)
                .map(CountryMapper::toResponseDTO);
    }

    // ----------------- GET COUNTRY BY ID -----------------
    @Override
    public CountryResponseDTO getCountryById(UUID id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException("Country with id " + id + " not found"));
        return CountryMapper.toResponseDTO(country);
    }

    // ----------------- CREATE COUNTRY -----------------
    @Override
    public CountryResponseDTO createCountry(CountryRequestDTO dto, Continent continent) {
        if (continent == null) throw new IllegalArgumentException("Continent must be provided");

        Country country = CountryMapper.toEntity(dto, continent);
        country.setContinent(continent);

        Country saved = countryRepository.save(country);
        return CountryMapper.toResponseDTO(saved);
    }

    // ----------------- UPDATE COUNTRY -----------------
    @Override
    public CountryResponseDTO updateCountry(UUID id, CountryRequestDTO dto, Continent continent) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException("Country with id " + id + " not found"));

        if (continent == null) throw new IllegalArgumentException("Continent must be provided");

        country.setName(dto.getName());
        country.setContinent(continent);

        Country updated = countryRepository.save(country);
        return CountryMapper.toResponseDTO(updated);
    }

    // ----------------- DELETE COUNTRY -----------------
    @Override
    public void deleteCountry(UUID id) {
        Country country = countryRepository.findById(id)
                .orElseThrow(() -> new CountryNotFoundException("Country with id " + id + " not found"));

        country.setActive(false); // soft delete
        countryRepository.save(country);
    }
}
