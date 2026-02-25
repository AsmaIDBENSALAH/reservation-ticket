package com.odc.reservationserver.dto.events;


import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseEvent {
    private UUID reservationId;
    private String status; // "SUCCESS" ou "FAILED"
    private String userEmail;
    private String userName;
    private String stadiumZoneName;
    private Integer quantity;
    private Double totalPrice;
    private UUID matchId;
}