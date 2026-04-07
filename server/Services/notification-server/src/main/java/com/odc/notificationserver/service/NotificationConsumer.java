package com.odc.notificationserver.service;

import com.odc.notificationserver.dto.ReservationConfirmedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final EmailService emailService;



    @KafkaListener(topics = "reservation-confirmed-topic", groupId = "notification-group")
    public void consumeReservationConfirmed(ReservationConfirmedEvent event) {
        log.info("Notification de réservation confirmée reçue : {}", event.getReservationId());

           if ("CONFIRMED".equals(event.getStatus())) {
                emailService.sendTicketEmail(event);
            } else if ("CANCELLED".equals(event.getStatus())) {
                emailService.sendCancellationEmail(event);
            }

    }
}