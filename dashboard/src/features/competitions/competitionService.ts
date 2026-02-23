import axiosInstance from "../../api/axiosInstance";
import type {
  Competition,
  CreateCompetitionPayload,
  PaginatedCompetitionsResponse,
} from "./competitionTypes";

export const getCompetitions = async (page: number, size: number): Promise<PaginatedCompetitionsResponse> => {
  const { data } = await axiosInstance.get<PaginatedCompetitionsResponse>("/api/competitions", {
    params: { page, size },
  });
  return data;
};

export const getCompetitionById = async (id: string): Promise<Competition> => {
  const { data } = await axiosInstance.get<Competition>(`/api/competitions/${id}`);
  return data;
};

export const createCompetition = async (payload: CreateCompetitionPayload): Promise<Competition> => {
  const { data } = await axiosInstance.post<Competition>("/api/competitions", payload);
  return data;
};

export const updateCompetition = async (id: string, payload: CreateCompetitionPayload): Promise<Competition> => {
  const { data } = await axiosInstance.put<Competition>(`/api/competitions/${id}`, payload);
  return data;
};

export const deleteCompetition = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/competitions/${id}`);
};
