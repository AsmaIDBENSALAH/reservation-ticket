package com.odc.matchserver.controller;

import com.odc.matchserver.dto.team.TeamRequestDTO;
import com.odc.matchserver.dto.team.TeamResponseDTO;
import com.odc.matchserver.enums.TeamType;
import com.odc.matchserver.services.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    // ---------------- GET ALL TEAMS (with optional type filter) ----------------
    @GetMapping
    public ResponseEntity<Page<TeamResponseDTO>> getTeams(
            Pageable pageable,
            @RequestParam(required = false) TeamType type
    ) {
        return ResponseEntity.ok(teamService.getTeams(pageable, type));
    }

    // ---------------- GET TEAM BY ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> getTeamById(@PathVariable UUID id) {
        return ResponseEntity.ok(teamService.getTeamById(id));
    }

    // ---------------- CREATE TEAM ----------------
    @PostMapping
    public ResponseEntity<TeamResponseDTO> createTeam(@RequestBody @Valid TeamRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(teamService.createTeam(dto));
    }

    // ---------------- UPDATE TEAM ----------------
    @PutMapping("/{id}")
    public ResponseEntity<TeamResponseDTO> updateTeam(
            @PathVariable UUID id,
            @RequestBody @Valid TeamRequestDTO dto
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