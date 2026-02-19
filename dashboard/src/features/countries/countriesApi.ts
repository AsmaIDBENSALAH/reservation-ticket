import axiosInstance from "../../api/axiosInstance";
import type { Country, CreateCountryPayload, PaginatedCountriesResponse } from "./countriesTypes";

interface GetCountriesParams {
  page?: number;
  size?: number;
}

export const getCountries = async (params?: GetCountriesParams): Promise<PaginatedCountriesResponse> => {
  const { data } = await axiosInstance.get<PaginatedCountriesResponse>("/api/countries", { params });
  return data;
};

export const createCountry = async (payload: CreateCountryPayload): Promise<Country> => {
  console.log(payload)
  const { data } = await axiosInstance.post<Country>("/api/countries", payload);
  return data;
};

