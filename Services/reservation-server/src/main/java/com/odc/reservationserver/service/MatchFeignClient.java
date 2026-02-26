package com.odc.reservationserver.service;

import com.odc.reservationserver.config.FeignConfig;
import com.odc.reservationserver.dto.MatchDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(name = "match-server", fallback = MatchFeignFallback.class,configuration = FeignConfig.class)
public interface MatchFeignClient {

    @GetMapping("/api/matches/clt/{id}")
    MatchDetailsDTO getMatchDetails(@PathVariable("id") UUID id);

    @PutMapping("/api/matches/clt/{matchId}/zones/{zoneId}/decrease")
    void decreaseAvailability(
            @PathVariable("matchId") UUID matchId,
            @PathVariable("zoneId") UUID zoneId, // Ici zoneId recevra le matchZonePricingId
            @RequestParam("quantity") int quantity
    );

    @PutMapping("/api/matches/clt/{matchId}/zones/{zoneId}/increase")
    void increaseAvailability(
            @PathVariable("matchId") UUID matchId,
            @PathVariable("zoneId") UUID zoneId,
            @RequestParam("quantity") int quantity
    );
}