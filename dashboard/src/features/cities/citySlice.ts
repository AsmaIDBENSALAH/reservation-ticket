import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createCity as createCityRequest,
  deleteCity as deleteCityRequest,
  getCities,
  getCityById as getCityByIdRequest,
  updateCity as updateCityRequest,
} from "./cityService";
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

export const fetchCityById = createAsyncThunk(
  "cities/fetchCityById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getCityByIdRequest(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateCity = createAsyncThunk<
  City,
  { id: string; payload: CreateCityPayload },
  { state: { cities: CitiesState } }
>("cities/updateCity", async ({ id, payload }, { dispatch, getState, rejectWithValue }) => {
  try {
    const updatedCity = await updateCityRequest(id, payload);
    const { page, size } = getState().cities.pagination;
    await dispatch(fetchCities({ page, size })).unwrap();
    return updatedCity;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteCity = createAsyncThunk<
  string,
  string,
  { state: { cities: CitiesState } }
>("cities/deleteCity", async (id, { dispatch, getState, rejectWithValue }) => {
  try {
    await deleteCityRequest(id);
    const { page, size } = getState().cities.pagination;
    await dispatch(fetchCities({ page, size })).unwrap();
    return id;
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
      })
      .addCase(fetchCityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch city";
      })
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to update city";
      })
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to delete city";
      });
  },
});

export default citySlice.reducer;
