import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
    createMatch as createMatchRequest,
    getMatches,
    updateMatch as updateMatchRequest,
    deleteMatch as deleteMatchRequest
} from "./matchService";
import type { MatchResponse, CreateMatchPayload } from "./matchTypes";

interface MatchesPagination {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

interface MatchesState {
    list: MatchResponse[];
    loading: boolean;
    error: string | null;
    pagination: MatchesPagination;
}

const initialState: MatchesState = {
    list: [],
    loading: false,
    error: null,
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
    },
};

const getErrorMessage = (error: unknown): string => {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message ?? axiosError.message ?? "Unexpected error";
};

// -------------------- Async Thunks --------------------

// Fetch matches
export const fetchMatches = createAsyncThunk(
    "matches/fetchMatches",
    async (params: { page: number; size: number }, { rejectWithValue }) => {
        try {
            return await getMatches(params.page, params.size);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Create match
export const createMatch = createAsyncThunk<MatchResponse, CreateMatchPayload, { state: { matches: MatchesState } }>(
    "matches/createMatch",
    async (payload, { dispatch, getState, rejectWithValue }) => {
        try {
            const createdMatch = await createMatchRequest(payload);
            const { page, size } = getState().matches.pagination;
            await dispatch(fetchMatches({ page, size })).unwrap();
            return createdMatch;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Update match
export const updateMatch = createAsyncThunk<
    MatchResponse,
    { matchId: string; payload: Partial<CreateMatchPayload> },
    { state: { matches: MatchesState } }
>(
    "matches/updateMatch",
    async ({ matchId, payload }, { dispatch, getState, rejectWithValue }) => {
        try {
            const updated = await updateMatchRequest(matchId, payload);
            const { page, size } = getState().matches.pagination;
            await dispatch(fetchMatches({ page, size })).unwrap();
            return updated;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// Delete match
export const deleteMatch = createAsyncThunk<
    string, // return matchId to remove from state
    string, // matchId
    { state: { matches: MatchesState } }
>(
    "matches/deleteMatch",
    async (matchId, { dispatch, getState, rejectWithValue }) => {
        try {
            await deleteMatchRequest(matchId);
            const { page, size } = getState().matches.pagination;
            await dispatch(fetchMatches({ page, size })).unwrap();
            return matchId;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

// -------------------- Slice --------------------
const matchSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchMatches
            .addCase(fetchMatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                const safeContent = Array.isArray(action.payload?.content) ? action.payload.content : [];
                state.loading = false;
                state.list = safeContent;
                state.pagination = {
                    page: Number.isFinite(action.meta.arg.page) ? action.meta.arg.page : 0,
                    size: Number.isFinite(action.meta.arg.size) ? action.meta.arg.size : state.pagination.size,
                    totalPages: Number.isFinite(action.payload?.totalPages) ? action.payload.totalPages : 0,
                    totalElements: Number.isFinite(action.payload?.totalElements) ? action.payload.totalElements : 0,
                };
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch matches";
            })

            // createMatch
            .addCase(createMatch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMatch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createMatch.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to create match";
            })

            // updateMatch
            .addCase(updateMatch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMatch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateMatch.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to update match";
            })

            // deleteMatch
            .addCase(deleteMatch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMatch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteMatch.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? action.error.message ?? "Failed to delete match";
            });
    },
});

export default matchSlice.reducer;