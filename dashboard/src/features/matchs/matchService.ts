import axiosInstance from "../../api/axiosInstance";
import type {
    CreateMatchPayload,
    PaginatedMatchesResponse, MatchResponse,
} from "./matchTypes";

export const getMatches = async (
    page: number,
    size: number
): Promise<PaginatedMatchesResponse> => {
    const { data } = await axiosInstance.get<PaginatedMatchesResponse>(
        "/api/matches",
        {
            params: { page, size },
        }
    );
    console.log(data)
    return data;
};

export const createMatch = async (
    payload: CreateMatchPayload
): Promise<MatchResponse> => {
    console.log(payload);
    const { data } = await axiosInstance.post<MatchResponse>("/api/matches", payload);
    console.log(data);
    return data;
};

export const updateMatch = async (
    matchId: string,
    payload: Partial<CreateMatchPayload> & { status?: string } // allow partial updates
): Promise<MatchResponse> => {
    console.log(payload)
    const { data } = await axiosInstance.put<MatchResponse>(`/api/matches/${matchId}`, payload);
    return data;
};

// Delete a match
export const deleteMatch = async (matchId: string): Promise<void> => {
    await axiosInstance.delete(`/api/matches/${matchId}`);
};