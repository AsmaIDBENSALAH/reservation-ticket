import axiosInstance from "../../api/axiosInstance";
import type { CreateStadiumPayload, PaginatedStadiumsResponse, Stadium } from "./stadiumTypes";

export const getStadiums = async (page: number, size: number): Promise<PaginatedStadiumsResponse> => {
  const { data } = await axiosInstance.get<PaginatedStadiumsResponse>("/api/stadiums", {
    params: { page, size },
  });
  return data;
};

export const createStadium = async (payload: CreateStadiumPayload): Promise<Stadium> => {
  console.log(payload);
  const { data } = await axiosInstance.post<Stadium>("/api/stadiums", payload);
  return data;
};
