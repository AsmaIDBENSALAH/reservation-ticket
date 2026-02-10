package com.odc.matchserver.services;


import com.odc.matchserver.dto.CountryRequestDTO;
import com.odc.matchserver.dto.CountryResponseDTO;
import com.odc.matchserver.enums.Continent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CountryService {

    List<CountryResponseDTO> getAllCountries();

    // ----------------- GET ALL COUNTRIES PAGINATED -----------------
    Page<CountryResponseDTO> getAllCountries(Pageable pageable);

    CountryResponseDTO getCountryById(UUID id);



    // ----------------- CREATE COUNTRY -----------------
    CountryResponseDTO createCountry(CountryRequestDTO dto, Continent continent);

    // ----------------- UPDATE COUNTRY -----------------
    CountryResponseDTO updateCountry(UUID id, CountryRequestDTO dto, Continent continent);

    void deleteCountry(UUID id);
}
