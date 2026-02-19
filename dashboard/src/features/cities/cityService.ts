import axiosInstance from "../../api/axiosInstance";
import type { City, CreateCityPayload, PaginatedCitiesResponse } from "./cityTypes";

export const getCities = async (page: number, size: number): Promise<PaginatedCitiesResponse> => {
  const { data } = await axiosInstance.get<PaginatedCitiesResponse>("/api/cities", {
    params: { page, size },
  });
  return data;
};

export const createCity = async (payload: CreateCityPayload): Promise<City> => {
  const { data } = await axiosInstance.post<City>("/api/cities", payload);
  return data;
};
