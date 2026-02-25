package com.odc.paymentserver.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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