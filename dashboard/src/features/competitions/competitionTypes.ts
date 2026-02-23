import type { ContinentName } from "../countries/countriesTypes";

export type TeamType = "CLUB" | "NATIONAL";

export type CompetitionScope = "NATIONAL" | "CONTINENTAL" | "GLOBAL";

export interface CompetitionCountry {
  id: string;
  name: string;
  continentName: ContinentName;
}

export interface Competition {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  description: string;
  teamType: TeamType;
  scope: CompetitionScope;
  country: CompetitionCountry;
  continent: ContinentName;
  countries?: CompetitionCountry[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface PaginatedCompetitionsResponse {
  totalPages: number;
  totalElements: number;
  pageable?: Record<string, unknown>;
  first?: boolean;
  last?: boolean;
  size?: number;
  content: Competition[];
  number?: number;
  sort?: Record<string, unknown>;
  numberOfElements?: number;
  empty?: boolean;
}

export interface CreateCompetitionPayload {
  name: string;
  abbreviation: string;
  logoUrl: string;
  description: string;
  teamType: TeamType;
  scope: CompetitionScope;
  countryId: string;
  continent: ContinentName;
}
