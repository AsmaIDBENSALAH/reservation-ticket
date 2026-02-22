import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { createStadium as createStadiumRequest, getStadiums } from "./stadiumService";
import type { CreateStadiumPayload, Stadium } from "./stadiumTypes";

interface StadiumsPagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

interface StadiumsState {
  list: Stadium[];
  loading: boolean;
  error: string | null;
  pagination: StadiumsPagination;
}

const initialState: StadiumsState = {
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

export const fetchStadiums = createAsyncThunk(
  "stadiums/fetchStadiums",
  async (params: { page: number; size: number }, { rejectWithValue }) => {
    try {
      return await getStadiums(params.page, params.size);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createStadium = createAsyncThunk<
  Stadium,
  CreateStadiumPayload,
  { state: { stadiums: StadiumsState } }
>("stadiums/createStadium", async (payload, { dispatch, getState, rejectWithValue }) => {
  try {
    const createdStadium = await createStadiumRequest(payload);
    const { page, size } = getState().stadiums.pagination;
    await dispatch(fetchStadiums({ page, size })).unwrap();
    return createdStadium;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const stadiumSlice = createSlice({
  name: "stadiums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStadiums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStadiums.fulfilled, (state, action) => {
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
      .addCase(fetchStadiums.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch stadiums";
      })
      .addCase(createStadium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStadium.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to create stadium";
      });
  },
});

export default stadiumSlice.reducer;
