// matchTypes.ts

export type MatchStatus = "SCHEDULED" | "CANCELLED" | "FINISHED";

export interface MatchResponse {
    id: string;
    dateTime: string; // ISO string
    status: MatchStatus;
    matchNumber: string;
    attendance: number;
    referee: string;
    matchImageUrl?: string | null;
    stadiumId: string;
    stadiumName: string;

    homeTeamId: string;
    homeTeamName: string;
    homeTeamAbbreviation: string;
    homeTeamLogoUrl: string;

    awayTeamId: string;
    awayTeamName: string;
    awayTeamAbbreviation: string;
    awayTeamLogoUrl: string;

    competitionId: string;
    competitionName: string;
    currency: string;
    zonePricings: ZonePricingResponse[];
}
export interface ZonePricingResponse {
    id: string;
    zoneId: string;
    name: string;
    price: number;
    availableSeats: number;
    soldSeats: number;

    isActive: boolean;
}

export interface PaginatedMatchesResponse {
    totalPages: number;
    totalElements: number;
    content: MatchResponse[];
}

// matchTypes.ts
export interface ZonePricing {
    zoneId: string;
    price: number;
    availableSeats: number;
    isActive: boolean;

}

export interface CreateMatchPayload {
    dateTime: string;
    status: string;
    matchNumber: string;
    attendance: number;
    referee: string;
    stadiumId: string;
    homeTeamId: string;
    awayTeamId: string;
    competitionId: string;

    currency : string;
    zonePricings: ZonePricing[];
}