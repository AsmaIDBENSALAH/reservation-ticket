package com.odc.matchserver.client;


import com.odc.matchserver.dto.match.MatchDetailsDTO;
import com.odc.matchserver.services.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/matches/clt")
@RequiredArgsConstructor
public class MatchControllerClt {

    private final MatchService matchService;

    /* =========================
       GET MATCH DETAILS
       ========================= */
    @GetMapping("/{id}")
    public MatchDetailsDTO getMatchDetails(@PathVariable UUID id) {
        return matchService.getMatchDetails(id);
    }

    /* =========================
       DECREASE AVAILABILITY
       ========================= */
    @PutMapping("/{matchId}/zones/{zoneId}/decrease")
    public void decreaseAvailability(
            @PathVariable UUID matchId,
            @PathVariable UUID zoneId,
            @RequestParam int quantity
    ) {
        matchService.decreaseAvailability(matchId, zoneId, quantity);
    }

    /* =========================
       INCREASE AVAILABILITY
       ========================= */
    @PutMapping("/{matchId}/zones/{zoneId}/increase")
    public void increaseAvailability(
            @PathVariable UUID matchId,
            @PathVariable UUID zoneId,
            @RequestParam int quantity
    ) {
        matchService.increaseAvailability(matchId, zoneId, quantity);
    }
}
