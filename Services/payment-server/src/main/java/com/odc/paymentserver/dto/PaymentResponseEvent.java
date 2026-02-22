package com.odc.paymentserver.dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentResponseEvent {
    private UUID reservationId;
    private String status; // SUCCESS ou FAILED
}