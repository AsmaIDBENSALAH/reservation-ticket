import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../services/authFetch";
import {
  getMatchById,
  getMatchDates,
  getMatchDetails,
  getMatches,
  getMatchesByCompetition,
  getMatchesByStadium,
  getStadiumById,
  getTeamById,
} from "../../services/matchesApi";

const initialState = {
  list: { content: [], totalPages: 0, totalElements: 0, number: 0, size: 10 },
  selectedMatch: null,
  matchDetails: null,
  homeTeam: null,
  awayTeam: null,
  stadium: null,
  matchesByStadium: [],
  matchesByCompetition: [],
  matchesByCompetitionPage: 0,
  matchesByCompetitionTotalPages: 0,
  mostPopular: [],
  matchDates: [],
  loading: {
    list: false,
    selected: false,
    details: false,
    homeTeam: false,
    awayTeam: false,
    stadium: false,
    byStadium: false,
    byCompetition: false,
    mostPopular: false,
    dates: false,
  },
  error: null,
};

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getMatches(params);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch matches");
    }
  },
);

export const fetchMatchById = createAsyncThunk(
  "matches/fetchMatchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getMatchById(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch match");
    }
  },
);

export const fetchMatchDetails = createAsyncThunk(
  "matches/fetchMatchDetails",
  async (id, { rejectWithValue }) => {
    try {
      return await getMatchDetails(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch match details");
    }
  },
);

export const fetchMatchesByStadium = createAsyncThunk(
  "matches/fetchMatchesByStadium",
  async (stadiumId, { rejectWithValue }) => {
    try {
      return await getMatchesByStadium(stadiumId);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch matches by stadium");
    }
  },
);

export const fetchMatchDates = createAsyncThunk(
  "matches/fetchMatchDates",
  async (_, { rejectWithValue }) => {
    try {
      return await getMatchDates();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch match dates");
    }
  },
);

export const fetchMatchesByCompetition = createAsyncThunk(
  "matches/fetchMatchesByCompetition",
  async (params, { rejectWithValue }) => {
    try {
      const payload =
        typeof params === "string" ? { competitionId: params, page: 0, size: 10 } : params;
      const { competitionId, page = 0, size = 10 } = payload || {};
      return await getMatchesByCompetition(competitionId, page, size);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch matches by competition");
    }
  },
);

export const fetchMostPopularMatches = createAsyncThunk(
  "matches/fetchMostPopularMatches",
  async (params = { page: 0, size: 10 }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await authFetch(
        `/api/matches/most-popular${query ? `?${query}` : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch most popular matches",
      );
    }
  },
);

export const fetchTeamById = createAsyncThunk(
  "matches/fetchTeamById",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await getTeamById(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch team");
    }
  },
);

export const fetchStadiumById = createAsyncThunk(
  "matches/fetchStadiumById",
  async (id, { rejectWithValue }) => {
    try {
      return await getStadiumById(id);
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch stadium");
    }
  },
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    clearSelectedMatch: (state) => {
      state.selectedMatch = null;
      state.matchDetails = null;
      state.homeTeam = null;
      state.awayTeam = null;
      state.stadium = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMatchesByCompetition: (state) => {
      state.matchesByCompetition = [];
      state.matchesByCompetitionPage = 0;
      state.matchesByCompetitionTotalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading.list = false;
        state.list = {
          content: action.payload?.content || [],
          totalPages: action.payload?.totalPages || 0,
          totalElements: action.payload?.totalElements || 0,
          number: action.payload?.number || 0,
          size: action.payload?.size || 10,
        };
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMatchById.pending, (state) => {
        state.loading.selected = true;
        state.error = null;
      })
      .addCase(fetchMatchById.fulfilled, (state, action) => {
        state.loading.selected = false;
        state.selectedMatch = action.payload;
      })
      .addCase(fetchMatchById.rejected, (state, action) => {
        state.loading.selected = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMatchDetails.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(fetchMatchDetails.fulfilled, (state, action) => {
        state.loading.details = false;
        state.matchDetails = action.payload;
      })
      .addCase(fetchMatchDetails.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMatchesByStadium.pending, (state) => {
        state.loading.byStadium = true;
        state.error = null;
      })
      .addCase(fetchMatchesByStadium.fulfilled, (state, action) => {
        state.loading.byStadium = false;
        state.matchesByStadium = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];
      })
      .addCase(fetchMatchesByStadium.rejected, (state, action) => {
        state.loading.byStadium = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMatchDates.pending, (state) => {
        state.loading.dates = true;
        state.error = null;
      })
      .addCase(fetchMatchDates.fulfilled, (state, action) => {
        state.loading.dates = false;
        state.matchDates = action.payload || [];
      })
      .addCase(fetchMatchDates.rejected, (state, action) => {
        state.loading.dates = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMatchesByCompetition.pending, (state) => {
        state.loading.byCompetition = true;
        state.error = null;
      })
      .addCase(fetchMatchesByCompetition.fulfilled, (state, action) => {
        state.loading.byCompetition = false;
        const page = action.meta.arg?.page || 0;
        const content = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];

        state.matchesByCompetition =
          page === 0 ? content : [...state.matchesByCompetition, ...content];
        state.matchesByCompetitionTotalPages = action.payload?.totalPages || 0;
        state.matchesByCompetitionPage = action.payload?.number ?? page;
      })
      .addCase(fetchMatchesByCompetition.rejected, (state, action) => {
        state.loading.byCompetition = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMostPopularMatches.pending, (state) => {
        state.loading.mostPopular = true;
        state.error = null;
      })
      .addCase(fetchMostPopularMatches.fulfilled, (state, action) => {
        state.loading.mostPopular = false;
        state.mostPopular = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.content || [];
      })
      .addCase(fetchMostPopularMatches.rejected, (state, action) => {
        state.loading.mostPopular = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTeamById.pending, (state, action) => {
        const role = action.meta.arg?.role;
        if (role === "home") {
          state.loading.homeTeam = true;
        } else if (role === "away") {
          state.loading.awayTeam = true;
        }
        state.error = null;
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        const role = action.meta.arg?.role;
        if (role === "home") {
          state.loading.homeTeam = false;
          state.homeTeam = action.payload;
        } else if (role === "away") {
          state.loading.awayTeam = false;
          state.awayTeam = action.payload;
        }
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        const role = action.meta.arg?.role;
        if (role === "home") {
          state.loading.homeTeam = false;
        } else if (role === "away") {
          state.loading.awayTeam = false;
        }
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchStadiumById.pending, (state) => {
        state.loading.stadium = true;
        state.error = null;
      })
      .addCase(fetchStadiumById.fulfilled, (state, action) => {
        state.loading.stadium = false;
        state.stadium = action.payload;
      })
      .addCase(fetchStadiumById.rejected, (state, action) => {
        state.loading.stadium = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedMatch, clearError, clearMatchesByCompetition } =
  matchesSlice.actions;

export const selectMatchesList = (state) => state.matches.list;
export const selectSelectedMatch = (state) => state.matches.selectedMatch;
export const selectMatchDetails = (state) => state.matches.matchDetails;
export const selectHomeTeam = (s) => s.matches.homeTeam;
export const selectAwayTeam = (s) => s.matches.awayTeam;
export const selectStadium = (s) => s.matches.stadium;
export const selectMatchesByStadium = (state) => state.matches.matchesByStadium;
export const selectMatchesByComp = (state) => state.matches.matchesByCompetition;
export const selectMatchesByCompPage = (s) => s.matches.matchesByCompetitionPage;
export const selectMatchesByCompTotalPages = (s) =>
  s.matches.matchesByCompetitionTotalPages;
export const selectMostPopularMatches = (s) => s.matches.mostPopular;
export const selectMatchDates = (state) => state.matches.matchDates;
export const selectMatchesLoading = (state) => state.matches.loading;
export const selectMatchesError = (state) => state.matches.error;

export default matchesSlice.reducer;
