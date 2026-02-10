package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.MatchDetailsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(name = "match-service", fallback = MatchFeignFallback.class)
public interface MatchFeignClient {

    @GetMapping("/api/matches/clt/{id}")
    MatchDetailsDTO getMatchDetails(@PathVariable UUID id);

    @PutMapping("/api/matches/clt/{id}/zones/{zone}/decrease")
    void decreaseAvailability(
            @PathVariable UUID id,
            @PathVariable UUID zone,
            @RequestParam int quantity
    );

    @PutMapping("/api/matches/clt/{id}/zones/{zone}/increase")
    void increaseAvailability(
            @PathVariable UUID id,
            @PathVariable UUID zone,
            @RequestParam int quantity
    );
}

