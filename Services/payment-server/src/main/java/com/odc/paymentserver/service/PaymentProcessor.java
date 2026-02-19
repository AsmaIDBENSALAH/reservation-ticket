package com.odc.paymentserver.service;

import com.odc.paymentserver.dto.PaymentRequestEvent;
import com.odc.paymentserver.dto.PaymentResponseEvent;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentProcessor {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    private final KafkaTemplate<String, Object> kafkaTemplate;

    /**
     * Consomme les demandes de paiement du topic Kafka
     */
    @KafkaListener(topics = "payment-request-topic", groupId = "payment-group")
    public void processPayment(PaymentRequestEvent event) {
        Stripe.apiKey = stripeSecretKey;
        log.info("💳 Début traitement Stripe pour Réservation ID: {}", event.getReservationId());

        try {
            // Configuration de la charge Stripe
            Map<String, Object> params = new HashMap<>();
            params.put("amount", (long) (event.getAmount() * 100)); // Conversion en centimes
            params.put("currency", event.getCurrency() != null ? event.getCurrency() : "eur");
            params.put("source", event.getStripeToken());
            params.put("description", "Paiement Réservation Match : " + event.getReservationId());

            // Appel à l'API Stripe
            Charge charge = Charge.create(params);

            if (charge.getPaid()) {
                log.info("✅ Paiement RÉUSSI pour Réservation: {}", event.getReservationId());
                sendResponse(event.getReservationId(), "SUCCESS");
            } else {
                log.error("❌ Paiement ÉCHOUÉ (Refusé) pour Réservation: {}", event.getReservationId());
                sendResponse(event.getReservationId(), "FAILED");
            }

        } catch (StripeException e) {
            log.error("⚠️ Erreur Stripe technique : {}", e.getMessage());
            sendResponse(event.getReservationId(), "FAILED");
        }
    }

    private void sendResponse(UUID reservationId, String status) {
        PaymentResponseEvent response = new PaymentResponseEvent(reservationId, status);
        kafkaTemplate.send("payment-response-topic", response);
        log.info("📢 Résultat envoyé à Kafka: {} pour {}", status, reservationId);
    }
}