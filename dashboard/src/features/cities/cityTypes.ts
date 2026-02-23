export interface City {
  id: string;
  name: string;
  countryId?: string;
  countryName?: string;
  country?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface PaginatedCitiesResponse {
  totalPages: number;
  totalElements: number;
  content: City[];
}

export interface CreateCityPayload {
  name: string;
  countryId: string;
}
