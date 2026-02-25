package com.odc.notificationserver.service;

import com.odc.notificationserver.dto.ReservationConfirmedEvent;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final PdfTicketService pdfTicketService; // ✅ ajoute ça

    @Value("${app.mail.from}")
    private String from;

    public void sendTicketEmail(ReservationConfirmedEvent event) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(from);
            helper.setTo(event.getUserEmail());
            helper.setSubject("🎟️ Votre ticket - Réservation confirmée !");
            helper.setText(buildTicketHtml(event), true);

            // ✅ Générer et attacher le PDF
            byte[] pdfBytes = pdfTicketService.generateTicketPdf(event);
            helper.addAttachment(
                    "ticket-" + event.getReservationId() + ".pdf",
                    new ByteArrayResource(pdfBytes),
                    "application/pdf"
            );

            mailSender.send(message);
            log.info("✅ Email ticket avec PDF envoyé à : {}", event.getUserEmail());

        } catch (Exception e) {
            log.error("❌ Erreur envoi email : {}", e.getMessage());
        }
    }

    public void sendCancellationEmail(ReservationConfirmedEvent event) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(from);
            helper.setTo(event.getUserEmail());
            helper.setSubject("❌ Réservation annulée - Paiement échoué");
            helper.setText(buildCancellationHtml(event), true);

            mailSender.send(message);
            log.info("Email annulation envoyé à : {}", event.getUserEmail());

        } catch (Exception e) {
            log.error("Erreur envoi email annulation : {}", e.getMessage());
        }
    }

    private String buildTicketHtml(ReservationConfirmedEvent event) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <div style="background-color: #1a237e; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1>🎟️ Votre Ticket</h1>
                </div>
                <div style="border: 2px solid #1a237e; padding: 20px; border-radius: 0 0 8px 8px;">
                    <p>Bonjour <strong>%s</strong>,</p>
                    <p>Votre réservation est <strong style="color: #2e7d32;">CONFIRMÉE</strong> !</p>
                    <hr/>
                    <table style="width: 100%%; border-collapse: collapse;">
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>N° Réservation</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Zone</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">%s</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nombre de places</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd;">%d place(s)</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total payé</strong></td>
                            <td style="padding: 10px; border: 1px solid #ddd; color: #1a237e;"><strong>%.2f EUR</strong></td>
                        </tr>
                    </table>
                    <br/>
                    <p style="color: #666; font-size: 12px;">
                        Votre ticket PDF est en pièce jointe. Présentez-le à l'entrée du stade. Bonne match ! ⚽
                    </p>
                </div>
            </body>
            </html>
            """.formatted(
                event.getUserName(),
                event.getReservationId(),
                event.getStadiumZoneName(),
                event.getQuantity(),
                event.getTotalPrice()
        );
    }

    private String buildCancellationHtml(ReservationConfirmedEvent event) {
        return """
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <div style="background-color: #c62828; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                    <h1>❌ Réservation Annulée</h1>
                </div>
                <div style="border: 2px solid #c62828; padding: 20px; border-radius: 0 0 8px 8px;">
                    <p>Bonjour <strong>%s</strong>,</p>
                    <p>Votre paiement a <strong style="color: #c62828;">échoué</strong>.</p>
                    <p>Votre réservation <strong>%s</strong> a été annulée et les places ont été libérées.</p>
                    <br/>
                    <p>Vous pouvez réessayer en effectuant une nouvelle réservation.</p>
                    <p style="color: #666; font-size: 12px;">Si vous pensez que c'est une erreur, contactez votre banque.</p>
                </div>
            </body>
            </html>
            """.formatted(
                event.getUserName(),
                event.getReservationId()
        );
    }
}