package com.odc.matchserver.services;

import com.odc.matchserver.dto.stadium.StadiumZoneMinimalDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneRequestDTO;
import com.odc.matchserver.dto.stadium.StadiumZoneUpdateDTO;
import com.odc.matchserver.entities.Stadium;
import com.odc.matchserver.entities.StadiumZone;
import com.odc.matchserver.exceptions.StadiumNotFoundException;
import com.odc.matchserver.exceptions.StadiumZoneNotFoundException;
import com.odc.matchserver.mapper.StadiumZoneMapper;
import com.odc.matchserver.repositories.StadiumRepository;
import com.odc.matchserver.repositories.StadiumZoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StadiumZoneServiceImpl implements StadiumZoneService {

    private final StadiumZoneRepository stadiumZoneRepository;
    private final StadiumRepository stadiumRepository;

    // ---------------- CREATE ----------------
    @Override
    public StadiumZoneMinimalDTO create(UUID stadiumId, StadiumZoneRequestDTO dto) {

        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));

        StadiumZone zone = StadiumZoneMapper.toEntity(dto, stadium);

        StadiumZone saved = stadiumZoneRepository.save(zone);

        return StadiumZoneMapper.toMinimalDTO(saved);
    }

    // ---------------- UPDATE ----------------
    @Override
    public StadiumZoneMinimalDTO update(StadiumZoneUpdateDTO dto) {

        StadiumZone zone = stadiumZoneRepository.findById(dto.getId())
                .orElseThrow(() -> new StadiumZoneNotFoundException("Zone not found"));

        StadiumZoneMapper.updateEntity(zone, dto);

        StadiumZone updated = stadiumZoneRepository.save(zone);

        return StadiumZoneMapper.toMinimalDTO(updated);
    }

    // ---------------- GET BY ID ----------------
    @Override
    public StadiumZoneMinimalDTO getById(UUID id) {

        StadiumZone zone = stadiumZoneRepository.findById(id)
                .orElseThrow(() -> new StadiumZoneNotFoundException("Zone not found"));

        return StadiumZoneMapper.toMinimalDTO(zone);
    }

    // ---------------- GET BY STADIUM (PAGINATED) ----------------
    @Override
    public Page<StadiumZoneMinimalDTO> getByStadiumId(UUID stadiumId, Pageable pageable) {

        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));

        return stadiumZoneRepository.findByStadium(stadium, pageable)
                .map(StadiumZoneMapper::toMinimalDTO);
    }

    // ---------------- DELETE ----------------
    @Override
    public void delete(UUID id) {


        StadiumZone stadiumZone = stadiumZoneRepository.findById(id)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));
stadiumZone.setActive(false);

        stadiumZoneRepository.save(stadiumZone);
    }



    @Override
    @Transactional
    public void deleteByStadiumId(UUID stadiumId) {

        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new StadiumNotFoundException("Stadium not found"));

        // Soft delete toutes les zones du stadium
        stadium.getZones().forEach(zone -> {
            zone.setActive(false);
            stadiumZoneRepository.save(zone);
        });
    }

}