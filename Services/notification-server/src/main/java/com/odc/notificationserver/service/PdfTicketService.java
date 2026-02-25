package com.odc.notificationserver.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.odc.notificationserver.dto.ReservationConfirmedEvent;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class PdfTicketService {

    public byte[] generateTicketPdf(ReservationConfirmedEvent event) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Rectangle pageSize = new Rectangle(700, 250);
        Document document = new Document(pageSize, 0, 0, 0, 0);
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        document.open();

        PdfContentByte canvas = writer.getDirectContent();
        BaseFont bf = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, false);
        BaseFont bfNormal = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.WINANSI, false);

        // ── FOND BLEU gauche ──
        canvas.setColorFill(new BaseColor(30, 100, 200));
        canvas.rectangle(0, 0, 520, 250);
        canvas.fill();

        // ── FOND JAUNE droite (stub) ──
        canvas.setColorFill(new BaseColor(255, 200, 0));
        canvas.rectangle(520, 0, 180, 250);
        canvas.fill();

        // ── LIGNE POINTILLÉE séparation ──
        canvas.setColorStroke(BaseColor.WHITE);
        canvas.setLineDash(5, 5);
        canvas.setLineWidth(1.5f);
        canvas.moveTo(520, 10);
        canvas.lineTo(520, 240);
        canvas.stroke();
        canvas.setLineDash(1, 0);

        // ── HEADER : compétition ──
        canvas.setColorFill(BaseColor.WHITE);
        canvas.beginText();
        canvas.setFontAndSize(bf, 12);
        canvas.showTextAligned(Element.ALIGN_CENTER,
                "* * * *   " + event.getCompetition().toUpperCase() + "   * * * *",
                260, 225, 0);
        canvas.endText();

        // ── BANDEAU JAUNE : équipes ──
        canvas.setColorFill(new BaseColor(255, 200, 0));
        canvas.rectangle(50, 190, 420, 25);
        canvas.fill();

        // Home team
        canvas.setColorFill(new BaseColor(30, 100, 200));
        canvas.beginText();
        canvas.setFontAndSize(bf, 12);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                event.getHomeTeam().toUpperCase(), 70, 197, 0);
        canvas.endText();

        // VS
        canvas.setColorFill(new BaseColor(200, 0, 0));
        canvas.beginText();
        canvas.setFontAndSize(bf, 14);
        canvas.showTextAligned(Element.ALIGN_CENTER, "VS", 260, 197, 0);
        canvas.endText();

        // Away team
        canvas.setColorFill(new BaseColor(30, 100, 200));
        canvas.beginText();
        canvas.setFontAndSize(bf, 12);
        canvas.showTextAligned(Element.ALIGN_RIGHT,
                event.getAwayTeam().toUpperCase(), 455, 197, 0);
        canvas.endText();

        // ── BADGE MATCH DAY ──
        canvas.setColorFill(new BaseColor(255, 200, 0));
        canvas.rectangle(30, 85, 90, 65);
        canvas.fill();

        canvas.setColorStroke(new BaseColor(20, 60, 150));
        canvas.setLineWidth(2);
        canvas.setLineDash(1, 0); // reset pointillé
        canvas.rectangle(30, 85, 90, 65);
        canvas.stroke();

        canvas.setColorFill(new BaseColor(20, 60, 150));
        canvas.beginText();
        canvas.setFontAndSize(bf, 9);
        canvas.showTextAligned(Element.ALIGN_CENTER, "MATCH", 75, 135, 0);
        canvas.endText();

        canvas.beginText();
        canvas.setFontAndSize(bf, 22);
        canvas.showTextAligned(Element.ALIGN_CENTER, "DAY", 75, 110, 0);
        canvas.endText();

        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 8);
        canvas.showTextAligned(Element.ALIGN_CENTER, "TICKET", 75, 95, 0);
        canvas.endText();

        // ── INFOS MATCH ──
        canvas.setColorFill(BaseColor.WHITE);
        canvas.beginText();
        canvas.setFontAndSize(bf, 13);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                event.getStadeName() != null ? event.getStadeName().toUpperCase() : "FOOTBALL STADIUM",
                140, 158, 0);
        canvas.endText();

        // Remplace "KICK OFF  19:00 PM" par la vraie date
        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 10);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                event.getMatchDate() != null
                        ? "KICK OFF  " + event.getMatchDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
                        : "KICK OFF  19:00 PM",
                140, 135, 0);
        canvas.endText();

        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 10);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                event.getStadeName() != null ? event.getStadeName().toUpperCase() : "LOREM STADIUM",
                140, 115, 0);
        canvas.endText();


        // REF
        canvas.setColorFill(new BaseColor(200, 225, 255));
        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 7);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                "REF: " + event.getReservationId().toString().toUpperCase(), 140, 85, 0);
        canvas.endText();

        // NOM CLIENT
        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 9);
        canvas.showTextAligned(Element.ALIGN_LEFT,
                event.getUserName().toUpperCase(), 140, 65, 0);
        canvas.endText();

        // ── BOXES : ZONE et PLACES ──
        drawInfoBox(canvas, bf, bfNormal, 340, 125, "ZONE", event.getStadiumZoneName());
        drawInfoBox(canvas, bf, bfNormal, 430, 125, "PLACES", String.valueOf(event.getQuantity()));

        // ── PRICE BOX ──
        canvas.setColorFill(new BaseColor(255, 200, 0));
        canvas.rectangle(340, 65, 160, 35);
        canvas.fill();

        canvas.setColorFill(new BaseColor(30, 100, 200));
        canvas.beginText();
        canvas.setFontAndSize(bf, 12);
        canvas.showTextAligned(Element.ALIGN_CENTER,
                String.format("PRICE  %.0f %s", event.getTotalPrice(),
                        event.getCurrency() != null ? event.getCurrency().toUpperCase() : "EUR"),
                420, 77, 0);
        canvas.endText();

        // ── QR CODE ──
        byte[] qrBytes = generateQrCode(event);
        Image qrImage = Image.getInstance(qrBytes);
        qrImage.scaleAbsolute(155, 155);
        qrImage.setAbsolutePosition(533, 45);
        canvas.addImage(qrImage);

        // Texte sous QR
        canvas.setColorFill(new BaseColor(30, 100, 200));
        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 7);
        canvas.showTextAligned(Element.ALIGN_CENTER, "SCANNEZ À L'ENTRÉE", 610, 28, 0);
        canvas.endText();

        document.close();
        return baos.toByteArray();
    }

    private void drawInfoBox(PdfContentByte canvas, BaseFont bf, BaseFont bfNormal,
                             int x, int y, String label, String value) throws Exception {
        canvas.setColorFill(new BaseColor(20, 80, 170));
        canvas.rectangle(x, y, 75, 45);
        canvas.fill();

        canvas.setColorFill(new BaseColor(180, 210, 255));
        canvas.beginText();
        canvas.setFontAndSize(bfNormal, 8);
        canvas.showTextAligned(Element.ALIGN_CENTER, label, x + 37, y + 30, 0);
        canvas.endText();

        canvas.setColorFill(BaseColor.WHITE);
        canvas.beginText();
        canvas.setFontAndSize(bf, 14);
        canvas.showTextAligned(Element.ALIGN_CENTER, value, x + 37, y + 10, 0);
        canvas.endText();
    }

    private byte[] generateQrCode(ReservationConfirmedEvent event) throws Exception {
        String qrContent = String.format(
                "RESERVATION:%s|NOM:%s|MATCH:%s VS %s|ZONE:%s|PLACES:%d|TOTAL:%.2f %s",
                event.getReservationId(),
                event.getUserName(),
                event.getHomeTeam(),
                event.getAwayTeam(),
                event.getStadiumZoneName(),
                event.getQuantity(),
                event.getTotalPrice(),
                event.getCurrency() != null ? event.getCurrency() : "EUR"
        );

        QRCodeWriter qrWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrWriter.encode(qrContent, BarcodeFormat.QR_CODE, 200, 200);

        int width = bitMatrix.getWidth();
        int height = bitMatrix.getHeight();
        BufferedImage qrImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                qrImage.setRGB(x, y, bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF);
            }
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "PNG", baos);
        return baos.toByteArray();
    }
}