package com.odc.notificationserver.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.odc.notificationserver.dto.ReservationConfirmedEvent;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class PdfTicketService {

    // ── Design colors ──
    private static final BaseColor GREEN_DARK  = new BaseColor(22, 90, 40);
    private static final BaseColor GREEN_LIGHT = new BaseColor(232, 245, 233);
    private static final BaseColor GREEN_BG    = new BaseColor(232, 240, 234);
    private static final BaseColor WHITE       = BaseColor.WHITE;
    private static final BaseColor GRAY_TEXT   = new BaseColor(154, 176, 158);
    private static final BaseColor BORDER_GRAY = new BaseColor(224, 224, 224);

    // ── Layout constants (points) ──
    private static final float W_MAIN = 540f;
    private static final float W_STUB = 130f;
    private static final float H      = 250f;
    private static final float PH     = 28f;
    private static final float RADIUS = 20f;

    public byte[] generateTicketPdf(ReservationConfirmedEvent event) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        Rectangle pageSize = new Rectangle(W_MAIN + W_STUB, H);
        Document document  = new Document(pageSize, 0, 0, 0, 0);
        PdfWriter writer   = PdfWriter.getInstance(document, baos);
        document.open();

        PdfContentByte cb = writer.getDirectContent();
        BaseFont bf       = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.WINANSI, false);
        BaseFont bfNormal = BaseFont.createFont(BaseFont.HELVETICA,      BaseFont.WINANSI, false);

        // ══════════════════════════════════════════════
        // BACKGROUNDS
        // ══════════════════════════════════════════════

        // Green main body
        drawRoundedRect(cb, 0, 0, W_MAIN, H, RADIUS, GREEN_DARK);

        // White stub (rounded right side)
        drawRoundedRect(cb, W_MAIN - RADIUS, 0, W_STUB + RADIUS, H, RADIUS, WHITE);

        // Square off the seam
        cb.setColorFill(GREEN_DARK);
        cb.rectangle(W_MAIN - RADIUS, 0, RADIUS, H);
        cb.fill();
        cb.setColorFill(WHITE);
        cb.rectangle(W_MAIN, 0, RADIUS, H);
        cb.fill();

        // Subtle vertical stripe overlay on green
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.025f));
        cb.setColorFill(WHITE);
        for (int xi = 22; xi < W_MAIN; xi += 24) {
            cb.rectangle(xi, 0, 2, H);
            cb.fill();
        }
        cb.restoreState();

        // Dashed separator at seam
        cb.saveState();
        cb.setColorStroke(GREEN_BG);
        cb.setLineWidth(2f);
        cb.setLineDash(6, 7);
        cb.moveTo(W_MAIN, 12);
        cb.lineTo(W_MAIN, H - 12);
        cb.stroke();
        cb.setLineDash(1, 0);
        cb.restoreState();

        // ══════════════════════════════════════════════
        // MAIN CONTENT
        // ══════════════════════════════════════════════

        // Ghost watermark number
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.045f));
        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bf, 190);
        cb.showTextAligned(Element.ALIGN_RIGHT, "11", W_MAIN - 5, -15, 0);
        cb.endText();
        cb.restoreState();

        // ── Competition badge pill ──
        String competition = event.getCompetition() != null
                ? event.getCompetition().toUpperCase() : "PREMIER LEAGUE · 2024/25";
        float badgeW = bfNormal.getWidthPoint(competition, 8f) + 28f;
        float badgeY = H - 38f;
        drawRoundedRect(cb, PH, badgeY, badgeW, 20, 10, GREEN_LIGHT);
        cb.setColorFill(GREEN_DARK);
        cb.beginText();
        cb.setFontAndSize(bf, 8);
        cb.showTextAligned(Element.ALIGN_LEFT, competition, PH + 14, badgeY + 6, 0);
        cb.endText();

        // "MATCH DAY TICKET" right label
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.38f));
        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bfNormal, 7);
        cb.showTextAligned(Element.ALIGN_RIGHT, "MATCH DAY TICKET", W_MAIN - PH, badgeY + 8, 0);
        cb.endText();
        cb.restoreState();

        // ── Teams — auto-shrink font so names never overlap ──
        float teamsY   = H - 95f;
        float midX     = W_MAIN / 2f;
        float maxTeamW = (W_MAIN / 2f) - PH - 40f;

        String homeTeam = event.getHomeTeam() != null ? event.getHomeTeam().toUpperCase() : "HOME";
        String awayTeam = event.getAwayTeam() != null ? event.getAwayTeam().toUpperCase() : "AWAY";

        float teamFontSize = 30f;
        while (teamFontSize > 10f &&
               (bf.getWidthPoint(homeTeam, teamFontSize) > maxTeamW ||
                bf.getWidthPoint(awayTeam, teamFontSize) > maxTeamW)) {
            teamFontSize -= 0.5f;
        }

        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bf, teamFontSize);
        cb.showTextAligned(Element.ALIGN_LEFT,  homeTeam, PH,          teamsY, 0);
        cb.endText();

        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bf, teamFontSize);
        cb.showTextAligned(Element.ALIGN_RIGHT, awayTeam, W_MAIN - PH, teamsY, 0);
        cb.endText();

        // HOME / AWAY labels
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.38f));
        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bfNormal, 7);
        cb.showTextAligned(Element.ALIGN_LEFT,  "HOME", PH,          teamsY - 13, 0);
        cb.endText();
        cb.beginText();
        cb.setFontAndSize(bfNormal, 7);
        cb.showTextAligned(Element.ALIGN_RIGHT, "AWAY", W_MAIN - PH, teamsY - 13, 0);
        cb.endText();
        cb.restoreState();

        // VS divider
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.22f));
        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bf, 14);
        cb.showTextAligned(Element.ALIGN_CENTER, "VS", midX, teamsY + 4, 0);
        cb.endText();
        cb.setGState(transparentGState(writer, 0.15f));
        cb.setColorStroke(WHITE);
        cb.setLineWidth(1f);
        cb.moveTo(midX, teamsY + 32); cb.lineTo(midX, teamsY + 16); cb.stroke();
        cb.moveTo(midX, teamsY + 2);  cb.lineTo(midX, teamsY - 10); cb.stroke();
        cb.restoreState();

        // ── Separator line ──
        float sepY = H - 112f;
        cb.saveState();
        cb.setGState(transparentGState(writer, 0.15f));
        cb.setColorStroke(WHITE);
        cb.setLineWidth(0.8f);
        cb.moveTo(PH, sepY); cb.lineTo(W_MAIN - PH, sepY); cb.stroke();
        cb.restoreState();

        // ── Info grid : Stadium | Date | Kick Off | Zone ──
        float infoLabelY = sepY - 7f;
        float infoValY   = sepY - 19f;
        float colW       = (W_MAIN - PH * 2) / 4f;

        String stadium = event.getStadeName() != null
                ? event.getStadeName().toUpperCase() : "STADIUM";
        String date = event.getMatchDate() != null
                ? event.getMatchDate().format(DateTimeFormatter.ofPattern("dd MMM yyyy")) : "—";
        String kickOff = event.getMatchDate() != null
                ? event.getMatchDate().format(DateTimeFormatter.ofPattern("HH:mm")) : "—";
        String zone = event.getStadiumZoneName() != null
                ? event.getStadiumZoneName().toUpperCase() : "—";

        String[] labels = {"STADIUM", "DATE", "KICK OFF", "ZONE"};
        String[] values = {stadium, date, kickOff, zone};

        for (int i = 0; i < 4; i++) {
            float xi = PH + i * colW;

            cb.saveState();
            cb.setGState(transparentGState(writer, 0.38f));
            cb.setColorFill(WHITE);
            cb.beginText();
            cb.setFontAndSize(bfNormal, 7);
            cb.showTextAligned(Element.ALIGN_LEFT, labels[i], xi, infoLabelY, 0);
            cb.endText();
            cb.restoreState();

            cb.setColorFill(WHITE);
            cb.beginText();
            cb.setFontAndSize(bf, 11);
            cb.showTextAligned(Element.ALIGN_LEFT, values[i], xi, infoValY, 0);
            cb.endText();
        }

        // ── Footer : customer name + REF + price pill ──
        float footerY = 22f;
        String userName = event.getUserName() != null
                ? event.getUserName().toUpperCase() : "CLIENT";
        String refId = event.getReservationId() != null
                ? event.getReservationId().toString().toUpperCase() : "—";
        String currency = event.getCurrency() != null
                ? event.getCurrency().toUpperCase() : "EUR";
        String priceStr = String.format("%.0f %s", event.getTotalPrice(), currency);

        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bf, 19);
        cb.showTextAligned(Element.ALIGN_LEFT, userName, PH, footerY + 14, 0);
        cb.endText();

        cb.saveState();
        cb.setGState(transparentGState(writer, 0.32f));
        cb.setColorFill(WHITE);
        cb.beginText();
        cb.setFontAndSize(bfNormal, 7);
        cb.showTextAligned(Element.ALIGN_LEFT, "REF: " + refId, PH, footerY, 0);
        cb.endText();
        cb.restoreState();

        // Price pill
        float priceW = bf.getWidthPoint(priceStr, 17f) + 32f;
        drawRoundedRect(cb, W_MAIN - PH - priceW, footerY - 2, priceW, 30, 15, GREEN_LIGHT);
        cb.setColorFill(GREEN_DARK);
        cb.beginText();
        cb.setFontAndSize(bf, 17);
        cb.showTextAligned(Element.ALIGN_CENTER, priceStr,
                W_MAIN - PH - priceW / 2f, footerY + 6, 0);
        cb.endText();

        // ══════════════════════════════════════════════
        // STUB — fake barcode drawn with rectangles only
        // No external library needed, no ZXing imports
        // ══════════════════════════════════════════════

        float stubPad = 10f;
        float bcBoxX  = W_MAIN + stubPad;
        float bcBoxW  = W_STUB - stubPad * 2f;
        float bcBoxH  = H - stubPad * 2f;
        float bcBoxY  = stubPad;

        // Rounded white box with border
        cb.setColorStroke(BORDER_GRAY);
        cb.setColorFill(WHITE);
        cb.setLineWidth(1.2f);
        cb.roundRectangle(bcBoxX, bcBoxY, bcBoxW, bcBoxH, 5);
        cb.fillStroke();

        // Fake barcode: varying-width vertical black bars, seeded from refId
        float barMargin = 8f;
        float barAreaX  = bcBoxX + barMargin;
        float barAreaY  = bcBoxY + barMargin;
        float barAreaW  = bcBoxW - barMargin * 2f;
        float barAreaH  = bcBoxH - barMargin * 2f;

        long seed = 0;
        for (char ch : refId.toCharArray()) seed += ch;
        Random rng = new Random(seed);

        List<float[]> pattern = new ArrayList<>();
        float xPos = 0f;

        // Opening guard bars
        pattern.add(new float[]{1.5f, 1});  xPos += 1.5f;
        pattern.add(new float[]{1.2f, 0});  xPos += 1.2f;

        // Random data bars
        while (xPos < barAreaW - 4f) {
            float remaining = barAreaW - 4f - xPos;
            float maxW = Math.min(3.5f, remaining);
            if (maxW < 0.8f) break;
            float barW  = 0.8f + rng.nextFloat() * (maxW - 0.8f);
            float isBlk = rng.nextFloat() > 0.45f ? 1f : 0f;
            pattern.add(new float[]{barW, isBlk});
            xPos += barW;
        }

        // Closing guard bars
        pattern.add(new float[]{1.2f, 0});
        pattern.add(new float[]{1.5f, 1});

        // Scale pattern to fill barAreaW exactly
        float totalW = 0f;
        for (float[] seg : pattern) totalW += seg[0];
        float scale = totalW > 0 ? barAreaW / totalW : 1f;

        cb.setColorFill(BaseColor.BLACK);
        float drawX = barAreaX;
        for (float[] seg : pattern) {
            float scaledW = seg[0] * scale;
            if (seg[1] == 1f) {
                cb.rectangle(drawX, barAreaY, scaledW, barAreaH);
                cb.fill();
            }
            drawX += scaledW;
        }

        document.close();
        return baos.toByteArray();
    }

    // ──────────────────────────────────────────
    // HELPERS
    // ──────────────────────────────────────────

    private void drawRoundedRect(PdfContentByte cb, float x, float y,
                                  float w, float h, float r, BaseColor fill) {
        cb.saveState();
        cb.setColorFill(fill);
        cb.roundRectangle(x, y, w, h, r);
        cb.fill();
        cb.restoreState();
    }

    private PdfGState transparentGState(PdfWriter writer, float alpha) {
        PdfGState gs = new PdfGState();
        gs.setFillOpacity(alpha);
        gs.setStrokeOpacity(alpha);
        return gs;
    }
}       