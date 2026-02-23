export interface StadiumZone {
  id: string;
  name: string;
  capacity: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface Stadium {
  id: string;
  name: string;
  address: string;
  cityId?: string;
  countryId?: string;
  capacity: number;
  constructionYear?: number;
  description?: string;
  cityName?: string;
  countryName?: string;
  zones: StadiumZone[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface PaginatedStadiumsResponse {
  totalPages: number;
  totalElements: number;
  content: Stadium[];
}

export interface CreateStadiumZonePayload {
  name: string;
  capacity: number;
  description: string;
  porte: string;
}

export interface CreateStadiumPayload {
  name: string;
  address: string;
  cityId: string;
  countryId: string;
  capacity: number;
  constructionYear?: number;
  description: string;
  zones: CreateStadiumZonePayload[];
}

export interface UpdateStadiumPayload {
  id: string;
  name: string;
  address: string;
  cityId: string;
  countryId: string;
  capacity: number;
  constructionYear: number;
  description: string;
}
