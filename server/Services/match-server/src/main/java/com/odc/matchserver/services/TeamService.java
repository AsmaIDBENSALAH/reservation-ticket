package com.odc.matchserver.services;

import com.odc.matchserver.dto.team.TeamRequestDTO;
import com.odc.matchserver.dto.team.TeamResponseDTO;
import com.odc.matchserver.enums.TeamType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TeamService {

    Page<TeamResponseDTO> getTeams(Pageable pageable, TeamType type);

    TeamResponseDTO getTeamById(UUID id);

    TeamResponseDTO createTeam(TeamRequestDTO dto);

    TeamResponseDTO updateTeam(UUID id, TeamRequestDTO dto);

    void deleteTeam(UUID id);
}