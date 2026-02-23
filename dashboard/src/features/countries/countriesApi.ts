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

export const getCountryById = async (id: string): Promise<Country> => {
  const { data } = await axiosInstance.get<Country>(`/api/countries/${id}`);
  return data;
};

export const createCountry = async (payload: CreateCountryPayload): Promise<Country> => {
  const { data } = await axiosInstance.post<Country>("/api/countries", payload);
  return data;
};

export const updateCountry = async (id: string, payload: CreateCountryPayload): Promise<Country> => {
  const { data } = await axiosInstance.put<Country>(`/api/countries/${id}`, payload);
  return data;
};

export const deleteCountry = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/countries/${id}`);
};
