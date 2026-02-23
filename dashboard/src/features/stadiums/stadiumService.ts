import axiosInstance from "../../api/axiosInstance";
import type {
  CreateStadiumPayload,
  PaginatedStadiumsResponse,
  Stadium,
  UpdateStadiumPayload,
} from "./stadiumTypes";

export const getStadiums = async (page: number, size: number): Promise<PaginatedStadiumsResponse> => {
  const { data } = await axiosInstance.get<PaginatedStadiumsResponse>("/api/stadiums", {
    params: { page, size },
  });
  return data;
};

export const getStadiumById = async (id: string): Promise<Stadium> => {
  const { data } = await axiosInstance.get<Stadium>(`/api/stadiums/${id}`);
  return data;
};

export const createStadium = async (payload: CreateStadiumPayload): Promise<Stadium> => {
  const { data } = await axiosInstance.post<Stadium>("/api/stadiums", payload);
  return data;
};

export const updateStadium = async (id: string, payload: UpdateStadiumPayload): Promise<Stadium> => {
  const { data } = await axiosInstance.put<Stadium>(`/api/stadiums/${id}`, payload);
  return data;
};

export const deleteStadium = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/stadiums/${id}`);
};
