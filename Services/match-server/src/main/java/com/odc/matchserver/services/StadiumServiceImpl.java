package com.odc.matchserver.services;

import com.odc.matchserver.dto.stadium.StadiumMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumUpdateDTO;
import com.odc.matchserver.entities.City;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.entities.Stadium;
import com.odc.matchserver.exceptions.CityNotFoundException;
import com.odc.matchserver.exceptions.CountryNotFoundException;
import com.odc.matchserver.exceptions.StadiumNotFoundException;
import com.odc.matchserver.mapper.StadiumMapper;
import com.odc.matchserver.repositories.CityRepository;
import com.odc.matchserver.repositories.CountryRepository;
import com.odc.matchserver.repositories.StadiumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StadiumServiceImpl implements StadiumService {

    private final StadiumRepository stadiumRepository;
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;

    private final  StadiumZoneService stadiumZoneService;

    // ----------------- GET ALL -----------------
    @Override
    public Page<StadiumMinimalDTO> getAll(Pageable pageable) {
        return stadiumRepository.findAll(pageable)
                .map(StadiumMapper::toMinimalDTO);
    }

    // ----------------- GET BY ID -----------------
    @Override
    public StadiumMinimalDTO getById(UUID id) {
        Stadium stadium = stadiumRepository.findById(id)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));

        return StadiumMapper.toMinimalDTO(stadium);
    }

    // ----------------- CREATE -----------------
    @Override
    @Transactional
    public StadiumMinimalDTO create(StadiumRequestDTO dto) {

        City city = cityRepository.findById(dto.getCityId())
                .orElseThrow(() -> new CityNotFoundException("City not found"));

        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(() -> new CountryNotFoundException("Country not found"));

        // 1️⃣ Création du stadium
        Stadium stadium = StadiumMapper.toEntity(dto, city, country);

        System.out.println(stadium);
        Stadium saved = stadiumRepository.save(stadium);

        // 2️⃣ Création des zones du stadium
        if (dto.getZones() != null && !dto.getZones().isEmpty()) {
            dto.getZones().forEach(zoneDto -> {
                stadiumZoneService.create(saved.getId(), zoneDto);
            });
        }

        return StadiumMapper.toMinimalDTO(saved);
    }

    // ----------------- UPDATE -----------------
    @Override
    public StadiumMinimalDTO update(StadiumUpdateDTO dto) {

        Stadium stadium = stadiumRepository.findById(dto.getId())
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));

        City city = null;
        Country country = null;

        if (dto.getCityId() != null) {
            city = cityRepository.findById(dto.getCityId())
                    .orElseThrow(() -> new CityNotFoundException("City not found"));
        }

        if (dto.getCountryId() != null) {
            country = countryRepository.findById(dto.getCountryId())
                    .orElseThrow(() -> new CountryNotFoundException("Country not found"));
        }

        StadiumMapper.updateEntity(stadium, dto, city, country);

        Stadium updated = stadiumRepository.save(stadium);

        return StadiumMapper.toMinimalDTO(updated);
    }

    // ----------------- DELETE -----------------
    @Override
    @Transactional
    public void delete(UUID id) {

        Stadium stadium = stadiumRepository.findById(id)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));


        // 2️⃣ Supprimer les StadiumZones
        stadiumZoneService.deleteByStadiumId(id);

        // 3️⃣ Supprimer le Stadium
        stadiumRepository.delete(stadium);
    }


    // ----------------- FILTER BY CITY -----------------
    @Override
    public Page<StadiumMinimalDTO> getByCity(UUID cityId, Pageable pageable) {

        if (!cityRepository.existsById(cityId)) {
            throw new CityNotFoundException("City not found");
        }

        return stadiumRepository.findByCity_Id(cityId, pageable)
                .map(StadiumMapper::toMinimalDTO);
    }

    // ----------------- FILTER BY COUNTRY -----------------
    @Override
    public Page<StadiumMinimalDTO> getByCountry(UUID countryId, Pageable pageable) {

        if (!countryRepository.existsById(countryId)) {
            throw new CountryNotFoundException("Country not found");
        }

        return stadiumRepository.findByCountry_Id(countryId, pageable)
                .map(StadiumMapper::toMinimalDTO);
    }

    // ----------------- FILTER BY CITY + COUNTRY -----------------
    @Override
    public Page<StadiumMinimalDTO> getByCityAndCountry(UUID cityId, UUID countryId, Pageable pageable) {

        if (!cityRepository.existsById(cityId)) {
            throw new CityNotFoundException("City not found");
        }
        if (!countryRepository.existsById(countryId)) {
            throw new CountryNotFoundException("Country not found");
        }

        return stadiumRepository
                .findByCity_IdAndCountry_Id(cityId, countryId, pageable)
                .map(StadiumMapper::toMinimalDTO);
    }
}