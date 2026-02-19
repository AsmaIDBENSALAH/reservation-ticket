import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { createCity as createCityRequest, getCities } from "./cityService";
import type { City, CreateCityPayload } from "./cityTypes";

interface CitiesPagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

interface CitiesState {
  list: City[];
  loading: boolean;
  error: string | null;
  pagination: CitiesPagination;
}

const initialState: CitiesState = {
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

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (
    params: { page: number; size: number },
    { rejectWithValue },
  ) => {
    try {
      return await getCities(params.page, params.size);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createCity = createAsyncThunk<
  City,
  CreateCityPayload,
  { state: { cities: CitiesState } }
>("cities/createCity", async (payload, { dispatch, getState, rejectWithValue }) => {
  try {
    const createdCity = await createCityRequest(payload);
    const { page, size } = getState().cities.pagination;
    await dispatch(fetchCities({ page, size })).unwrap();
    return createdCity;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
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
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch cities";
      })
      .addCase(createCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to create city";
      });
  },
});

export default citySlice.reducer;
