package com.odc.matchserver.services;

import com.odc.matchserver.dto.CityRequestDTO;
import com.odc.matchserver.dto.CityResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CityService {


    // ----------------- Pagination -----------------
    Page<CityResponseDTO> getAllCities(Pageable pageable);

    CityResponseDTO getCityById(UUID id);

    CityResponseDTO createCity(CityRequestDTO dto, UUID countryId);

    CityResponseDTO updateCity(UUID id, CityRequestDTO dto, UUID countryId);

    void deleteCity(UUID id);

    Page<CityResponseDTO> searchCities(String keyword, Pageable pageable);
}
