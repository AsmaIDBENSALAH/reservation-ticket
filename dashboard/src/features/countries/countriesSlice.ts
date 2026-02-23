import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  createCountry as createCountryRequest,
  deleteCountry as deleteCountryRequest,
  getCountries,
  getCountryById as getCountryByIdRequest,
  updateCountry as updateCountryRequest,
} from "./countriesApi";
import type { Country, CreateCountryPayload } from "./countriesTypes";

interface CountriesPagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

interface CountriesState {
  list: Country[];
  loading: boolean;
  error: string | null;
  pagination: CountriesPagination;
}

const initialState: CountriesState = {
  list: [],
  loading: false,
  error: null,
  pagination: {
    page: 0,
    size: 4,
    totalPages: 0,
    totalElements: 0,
    first: true,
    last: true,
    empty: true,
  },
};

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? axiosError.message ?? "Unexpected error";
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (params: { page?: number; size?: number } | void, { rejectWithValue }) => {
    try {
      return await getCountries(params ?? undefined);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchCountryById = createAsyncThunk(
  "countries/fetchCountryById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getCountryByIdRequest(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createCountry = createAsyncThunk<
  Country,
  CreateCountryPayload,
  { state: { countries: CountriesState } }
>(
  "countries/createCountry",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const createdCountry = await createCountryRequest(payload);
      const { page, size } = getState().countries.pagination;
      await dispatch(fetchCountries({ page, size })).unwrap();
      return createdCountry;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateCountry = createAsyncThunk<
  Country,
  { id: string; payload: CreateCountryPayload },
  { state: { countries: CountriesState } }
>(
  "countries/updateCountry",
  async ({ id, payload }, { dispatch, getState, rejectWithValue }) => {
    try {
      const updatedCountry = await updateCountryRequest(id, payload);
      const { page, size } = getState().countries.pagination;
      await dispatch(fetchCountries({ page, size })).unwrap();
      return updatedCountry;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteCountry = createAsyncThunk<
  string,
  string,
  { state: { countries: CountriesState } }
>(
  "countries/deleteCountry",
  async (id, { dispatch, getState, rejectWithValue }) => {
    try {
      await deleteCountryRequest(id);
      const { page, size } = getState().countries.pagination;
      await dispatch(fetchCountries({ page, size })).unwrap();
      return id;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        const safeContent = Array.isArray(action.payload?.content) ? action.payload.content : [];
        state.loading = false;
        state.list = safeContent;
        state.pagination = {
          page: Number.isFinite(action.payload?.number) ? action.payload.number : 0,
          size: Number.isFinite(action.payload?.size) ? action.payload.size : state.pagination.size,
          totalPages: Number.isFinite(action.payload?.totalPages) ? action.payload.totalPages : 0,
          totalElements: Number.isFinite(action.payload?.totalElements) ? action.payload.totalElements : 0,
          first: Boolean(action.payload?.first),
          last: Boolean(action.payload?.last),
          empty: Boolean(action.payload?.empty),
        };
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch countries";
      })
      .addCase(fetchCountryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCountryById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to fetch country";
      })
      .addCase(createCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to create country";
      })
      .addCase(updateCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to update country";
      })
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "Failed to delete country";
      });
  },
});

export default countriesSlice.reducer;
