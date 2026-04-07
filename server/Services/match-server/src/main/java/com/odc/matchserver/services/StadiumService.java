package com.odc.matchserver.services;

import com.odc.matchserver.dto.stadium.StadiumMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface StadiumService {

    Page<StadiumMinimalDTO> getAll(Pageable pageable);

    StadiumMinimalDTO getById(UUID id);

    StadiumMinimalDTO create(StadiumRequestDTO dto);

    StadiumMinimalDTO update(StadiumUpdateDTO dto);

    void delete(UUID id);

    // ----------------- FILTER METHODS -----------------
    Page<StadiumMinimalDTO> getByCity(UUID cityId, Pageable pageable);

    Page<StadiumMinimalDTO> getByCountry(UUID countryId, Pageable pageable);

    Page<StadiumMinimalDTO> getByCityAndCountry(UUID cityId, UUID countryId, Pageable pageable);
}