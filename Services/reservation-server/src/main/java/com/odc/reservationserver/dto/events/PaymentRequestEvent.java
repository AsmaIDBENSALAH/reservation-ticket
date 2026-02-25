package com.odc.reservationserver.dto.events;

import lombok.*;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestEvent {
    private UUID reservationId;
    private Double amount;
    private String currency;
    private String stripeToken;
    private String userEmail;
    private String userName;
    private UUID matchId;
    private String stadiumZoneName;
    private Integer quantity;
}