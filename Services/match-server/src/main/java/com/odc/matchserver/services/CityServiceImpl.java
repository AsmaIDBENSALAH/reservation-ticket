package com.odc.matchserver.services;

import com.odc.matchserver.dto.CityRequestDTO;
import com.odc.matchserver.dto.CityResponseDTO;
import com.odc.matchserver.entities.City;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.exceptions.CityNotFoundException;
import com.odc.matchserver.exceptions.CountryNotFoundException;
import com.odc.matchserver.mapper.CityMapper;
import com.odc.matchserver.repositories.CityRepository;
import com.odc.matchserver.repositories.CountryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;

    // ----------------- Pagination -----------------
    @Override
    public Page<CityResponseDTO> getAllCities(Pageable pageable) {
        return cityRepository.findByActiveTrueOrderByCreatedAtDesc(pageable)
                .map(CityMapper::toResponseDTO);
    }

    @Override
    public CityResponseDTO getCityById(UUID id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new CityNotFoundException("City with id " + id + " not found"));
        return CityMapper.toResponseDTO(city);
    }

    @Override
    public CityResponseDTO createCity(CityRequestDTO dto) {
        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(
                        () -> new CountryNotFoundException("Country with id " + dto.getCountryId() + " not found"));

        City city = CityMapper.toEntity(dto, country);
        City savedCity = cityRepository.save(city);

        return CityMapper.toResponseDTO(savedCity);
    }

    @Override
    public CityResponseDTO updateCity(UUID id, CityRequestDTO dto, UUID countryId) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new CityNotFoundException("City with id " + id + " not found"));

        Country country = countryRepository.findById(countryId)
                .orElseThrow(() -> new CountryNotFoundException("Country with id " + countryId + " not found"));

        city.setName(dto.getName());
        city.setCountry(country);

        City updatedCity = cityRepository.save(city);
        return CityMapper.toResponseDTO(updatedCity);
    }

    @Override
    public void deleteCity(UUID id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new CityNotFoundException("City with id " + id + " not found"));

        city.setActive(false);
        cityRepository.save(city);
    }

}