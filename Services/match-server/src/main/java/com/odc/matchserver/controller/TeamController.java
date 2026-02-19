package com.odc.matchserver.controller;

import com.odc.matchserver.dto.team.TeamRequestDTO;
import com.odc.matchserver.dto.team.TeamResponseDTO;
import com.odc.matchserver.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    // ---------------- GET ALL TEAMS PAGINATED ----------------
    @GetMapping
    public ResponseEntity<Page<TeamResponseDTO>> getAllTeams(Pageable pageable) {
        return ResponseEntity.ok(teamService.getAllTeams(pageable));
    }

    // ---------------- GET TEAM BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> getTeamById(@PathVariable UUID id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    // ---------------- CREATE TEAM ----------------
    @PostMapping
    public ResponseEntity<TeamResponseDTO> createTeam(@RequestBody TeamRequestDTO dto) {
        return ResponseEntity.ok(teamService.createTeam(dto));
    }

    // ---------------- UPDATE TEAM ----------------
    @PutMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> updateTeam(
            @PathVariable UUID id,
            @RequestBody TeamRequestDTO dto
    ) {
        return ResponseEntity.ok(teamService.updateTeam(id, dto));
    }

    // ---------------- DELETE TEAM (SOFT DELETE) ----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
        teamService.deleteTeam(id);
        return ResponseEntity.noContent().build();
    }

}
