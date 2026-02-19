package com.odc.matchserver.services;

import com.odc.matchserver.dto.team.TeamRequestDTO;
import com.odc.matchserver.dto.team.TeamResponseDTO;
import com.odc.matchserver.entities.Country;
import com.odc.matchserver.entities.Team;
import com.odc.matchserver.enums.TeamType;
import com.odc.matchserver.exceptions.CountryNotFoundException;
import com.odc.matchserver.exceptions.TeamNotFoundException;
import com.odc.matchserver.mapper.TeamMapper;
import com.odc.matchserver.repositories.CountryRepository;
import com.odc.matchserver.repositories.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final CountryRepository countryRepository;

    // ---------------- GET TEAMS (ALL OR BY TYPE) ----------------
    @Override
    public Page<TeamResponseDTO> getTeams(Pageable pageable, TeamType type) {
        if (type == null) {
            return teamRepository.findAllByActiveTrue(pageable)
                    .map(TeamMapper::toResponseDTO);
        }
        return teamRepository.findAllByActiveTrueAndType(type, pageable)
                .map(TeamMapper::toResponseDTO);
    }

    // ---------------- GET TEAM BY ID ----------------
    @Override
    public TeamResponseDTO getTeamById(UUID id) {
        Team team = teamRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new TeamNotFoundException("Team not found with id: " + id));
        return TeamMapper.toResponseDTO(team);
    }

    // ---------------- CREATE TEAM ----------------
    @Override
    @Transactional
    public TeamResponseDTO createTeam(TeamRequestDTO dto) {
        Country country = countryRepository.findById(dto.getCountryId())
                .orElseThrow(() -> new CountryNotFoundException("Country not found with id: " + dto.getCountryId()));

        Team team = TeamMapper.toEntity(dto, country);
        team.setActive(true);

        Team savedTeam = teamRepository.save(team);
        return TeamMapper.toResponseDTO(savedTeam);
    }

    // ---------------- UPDATE TEAM ----------------
    @Override
    @Transactional
    public TeamResponseDTO updateTeam(UUID id, TeamRequestDTO dto) {
        Team team = teamRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new TeamNotFoundException("Team not found with id: " + id));

        if (dto.getCountryId() != null) {
            Country country = countryRepository.findById(dto.getCountryId())
                    .orElseThrow(() -> new CountryNotFoundException("Country not found with id: " + dto.getCountryId()));
            team.setCountry(country);
        }

        if (dto.getName() != null) team.setName(dto.getName());
        if (dto.getLogoUrl() != null) team.setLogoUrl(dto.getLogoUrl());
        if (dto.getAbbreviation() != null) team.setAbbreviation(dto.getAbbreviation());
        if (dto.getType() != null) team.setType(dto.getType());
        if (dto.getFoundingYear() != null) team.setFoundingYear(dto.getFoundingYear());
        if (dto.getDescription() != null) team.setDescription(dto.getDescription());

        Team updatedTeam = teamRepository.save(team);
        return TeamMapper.toResponseDTO(updatedTeam);
    }

    // ---------------- DELETE TEAM (SOFT DELETE) ----------------
    @Override
    @Transactional
    public void deleteTeam(UUID id) {
        Team team = teamRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new TeamNotFoundException("Team not found with id: " + id));
        team.setActive(false);
        teamRepository.save(team);
    }
}