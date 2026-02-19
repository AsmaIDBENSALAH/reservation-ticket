package com.odc.notificationserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseEvent {
    private UUID reservationId;
    private String status; // SUCCESS ou FAILED
}