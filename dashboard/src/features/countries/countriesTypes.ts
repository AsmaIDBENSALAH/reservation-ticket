export type ContinentName =
  | "AFRICA"
  | "EUROPE"
  | "ASIA"
  | "AMERICAS"
  | "OCEANIA"
  | "ARAB_WORLD";

export interface Country {
  id: string;
  name: string;
  continentName: ContinentName;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  active: boolean;
}

export interface PaginatedCountriesResponse {
  totalPages: number;
  totalElements: number;
  pageable: Record<string, unknown>;
  content: Country[];
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateCountryPayload {
  name: string;
  continentName: ContinentName;
}
