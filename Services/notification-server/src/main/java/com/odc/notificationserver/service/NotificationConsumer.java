package com.odc.notificationserver.service;

import com.odc.notificationserver.dto.PaymentResponseEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationConsumer {

    private final EmailService emailService;

    @KafkaListener(topics = "payment-response-topic", groupId = "notification-group")
    public void consumePaymentResult(PaymentResponseEvent event) {
        log.info("🔔 Notification reçue pour la réservation : {}", event.getReservationId());

        if ("SUCCESS".equals(event.getStatus())) {
            // Dans un cas réel, vous iriez chercher l'email de l'utilisateur via Feign
            // Ici, pour la démo, on simule l'envoi
            String userEmail = "client-test@example.com";

            emailService.sendTicketEmail(
                    userEmail,
                    event.getReservationId(),
                    "Tribune Nord - Rang 5 - Place 42"
            );
        } else {
            log.warn("❌ Pas d'email envoyé : le paiement a échoué pour {}", event.getReservationId());
        }
    }
}
