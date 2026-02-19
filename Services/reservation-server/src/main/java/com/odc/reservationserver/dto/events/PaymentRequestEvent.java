package com.odc.reservationserver.dto.events;

import lombok.*;
import java.util.UUID;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class PaymentRequestEvent {
    private UUID reservationId;
    private Double amount;
    private String currency;
    private String stripeToken;
}