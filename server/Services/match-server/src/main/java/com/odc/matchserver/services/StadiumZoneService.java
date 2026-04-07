package com.odc.matchserver.services;

import com.odc.matchserver.dto.stadium.StadiumZoneMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface StadiumZoneService {


    // ---------------- CREATE ----------------
    StadiumZoneMinimalDTO create(UUID stadiumId, StadiumZoneRequestDTO dto);

    // ---------------- UPDATE ----------------
    StadiumZoneMinimalDTO update(StadiumZoneUpdateDTO dto);

    // ---------------- GET BY ID ----------------
    StadiumZoneMinimalDTO getById(UUID id);

    // ---------------- GET BY STADIUM (PAGINATED) ----------------
    Page<StadiumZoneMinimalDTO> getByStadiumId(UUID stadiumId, Pageable pageable);

    // ---------------- DELETE ----------------
    void delete(UUID id);

    @Transactional
    void deleteByStadiumId(UUID stadiumId);
}