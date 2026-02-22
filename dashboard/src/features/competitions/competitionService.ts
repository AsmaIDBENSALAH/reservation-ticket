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

export const createCompetition = async (payload: CreateCompetitionPayload): Promise<Competition> => {
  const { data } = await axiosInstance.post<Competition>("/api/competitions", payload);
  return data;
};
