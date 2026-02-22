package com.odc.reservationserver.dto.events;


import lombok.*;
import java.util.UUID;

@Data @AllArgsConstructor @NoArgsConstructor
public class PaymentResponseEvent {
    private UUID reservationId;
    private String status; // SUCCESS ou FAILED
}