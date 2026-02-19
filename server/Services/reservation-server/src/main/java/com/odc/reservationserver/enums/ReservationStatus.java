package com.odc.reservationserver.enums;
public enum ReservationStatus {
    PENDING,    // En attente de paiement
    CONFIRMED,  // Payé et validé
    CANCELLED,  // Annulé par l'utilisateur
    EXPIRED     // Temps de paiement dépassé
}