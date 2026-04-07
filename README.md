# Gestion de Réservation des Tickets

Architecture microservices Spring Boot.

![Diagramme sans nom (2)](https://github.com/user-attachments/assets/2f7e38af-c061-47ae-9b3f-3d0c5b31287f)


## server/Services

### Infrastructure
| Service | Rôle |
|---|---|
| `config-server` | Centralise les configurations de tous les services |
| `discovery` | Registre des services avec Eureka |
| `gateway-server` | Point d'entrée unique, routage des requêtes |

### Métier
| Service | Rôle |
|---|---|
| `match-server` | Gestion des matchs et événements |
| `reservation-server` | Gestion des réservations |
| `payment-server` | Traitement des paiements |

### Messaging / Événements
| Service | Rôle |
|---|---|
| `notification-server` | Envoi d'emails et génération de tickets PDF |
