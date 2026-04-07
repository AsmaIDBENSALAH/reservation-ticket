package com.odc.paymentserver.service;

import com.odc.paymentserver.dto.PaymentRequestEvent;
import com.odc.paymentserver.dto.PaymentResponseEvent;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentConsumer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @KafkaListener(topics = "payment-request-topic", groupId = "payment-group")
    public void processPayment(PaymentRequestEvent event) {
        log.info("Paiement reçu pour réservation : {}", event.getReservationId());

        Stripe.apiKey = stripeApiKey;
        String status;

        try {
            ChargeCreateParams params = ChargeCreateParams.builder()
                    .setAmount((long) (event.getAmount() * 100)) // en centimes
                    .setCurrency(event.getCurrency())
                    .setSource(event.getStripeToken())
                    .setDescription("Réservation " + event.getReservationId())
                    .build();

            Charge charge = Charge.create(params);
            status = charge.getPaid() ? "SUCCESS" : "FAILED";
            log.info("Stripe charge : {} → {}", charge.getId(), status);

        } catch (StripeException e) {
            log.error("Erreur Stripe : {}", e.getMessage());
            status = "FAILED";
        }

        // Renvoyer le résultat à Kafka
        PaymentResponseEvent response = new PaymentResponseEvent(
                event.getReservationId(),
                status,
                event.getUserEmail(),
                event.getUserName(),
                event.getStadiumZoneName(),
                event.getQuantity(),
                event.getAmount(),
                event.getMatchId()
        );
        kafkaTemplate.send("payment-response-topic", response);
        log.info("Résultat envoyé → payment-response-topic : {}", status);
    }
}