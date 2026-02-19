export interface City {
  id: string;
  name: string;
  countryName: string;
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
