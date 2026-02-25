import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCompetitionById, getCompetitions } from "../../services/matchesApi";

const initialState = {
  list: { content: [], totalPages: 0, totalElements: 0, number: 0, size: 10 },
  selectedCompetition: null,
  loading: {
    list: false,
    selected: false,
  },
  error: null,
};

export const fetchCompetitions = createAsyncThunk(
  "competitions/fetchCompetitions",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getCompetitions(params);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch competitions");
    }
  },
);

export const fetchCompetitionById = createAsyncThunk(
  "competitions/fetchCompetitionById",
  async (id, { rejectWithValue }) => {
    try {
      return await getCompetitionById(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch competition");
    }
  },
);

const competitionsSlice = createSlice({
  name: "competitions",
  initialState,
  reducers: {
    clearSelectedCompetition: (state) => {
      state.selectedCompetition = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitions.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchCompetitions.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = {
          content: action.payload?.content || [],
          totalPages: action.payload?.totalPages || 0,
          totalElements: action.payload?.totalElements || 0,
          number: action.payload?.number || 0,
          size: action.payload?.size || 10,
        };
      })
      .addCase(fetchCompetitions.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCompetitionById.pending, (state) => {
        state.loading.selected = true;
        state.error = null;
      })
      .addCase(fetchCompetitionById.fulfilled, (state, action) => {
        state.loading.selected = false;
        state.selectedCompetition = action.payload;
      })
      .addCase(fetchCompetitionById.rejected, (state, action) => {
        state.loading.selected = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedCompetition, clearError } = competitionsSlice.actions;

export const selectCompetitionsList = (state) => state.competitions.list;
export const selectSelectedCompetition = (state) =>
  state.competitions.selectedCompetition;
export const selectCompetitionsLoading = (state) => state.competitions.loading;
export const selectCompetitionsError = (state) => state.competitions.error;

export default competitionsSlice.reducer;
