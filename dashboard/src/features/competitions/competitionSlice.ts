import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createCompetition as createCompetitionRequest,
  getCompetitions,
} from "./competitionService";
import type { Competition, CreateCompetitionPayload } from "./competitionTypes";

interface CompetitionsPagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

interface CompetitionsState {
  list: Competition[];
  loading: boolean;
  error: string | null;
  pagination: CompetitionsPagination;
}

const initialState: CompetitionsState = {
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

export const fetchCompetitions = createAsyncThunk(
  "competitions/fetchCompetitions",
  async (params: { page: number; size: number }, { rejectWithValue }) => {
    try {
      return await getCompetitions(params.page, params.size);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createCompetition = createAsyncThunk<
  Competition,
  CreateCompetitionPayload,
  { state: { competitions: CompetitionsState } }
>("competitions/createCompetition", async (payload, { dispatch, getState, rejectWithValue }) => {
  try {
    const createdCompetition = await createCompetitionRequest(payload);
    const { page, size } = getState().competitions.pagination;
    await dispatch(fetchCompetitions({ page, size })).unwrap();
    return createdCompetition;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const competitionSlice = createSlice({
  name: "competitions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompetitions.fulfilled, (state, action) => {
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
      .addCase(fetchCompetitions.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch competitions";
      })
      .addCase(createCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompetition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to create competition";
      });
  },
});

export default competitionSlice.reducer;
