package com.odc.notificationserver.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendTicketEmail(String toEmail, UUID reservationId, String ticketDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Votre Ticket de Match - Confirmation");
        message.setText("Félicitations ! Votre paiement est validé.\n\n" +
                "Numéro de réservation : " + reservationId + "\n" +
                "Détails : " + ticketDetails + "\n\n" +
                "Présentez ce mail à l'entrée du stade.");

        mailSender.send(message);
        log.info("📧 Email de confirmation envoyé à {}", toEmail);
    }
}