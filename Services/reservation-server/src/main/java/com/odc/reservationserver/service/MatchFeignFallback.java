package com.odc.reservationserver.service;

import com.odc.reservationserver.dto.MatchDetailsDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MatchFeignFallback implements MatchFeignClient {

    @Override
    public MatchDetailsDTO getMatchDetails(UUID id) {
        throw new RuntimeException("Match-service indisponible");
    }

    @Override
    public void decreaseAvailability(UUID id, UUID zone, int quantity) {
        throw new RuntimeException("Impossible de diminuer la disponibilité");

    }

    @Override
    public void increaseAvailability(UUID id, UUID zone, int quantity) {
        throw new RuntimeException("Impossible d’augmenter la disponibilité");

    }


}
