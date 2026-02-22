import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KeycloakProfile } from "keycloak-js";

interface AuthState {
  isAuthenticated: boolean;
  userProfile: KeycloakProfile | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userProfile: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<KeycloakProfile | null>) {
      state.isAuthenticated = true;
      state.userProfile = action.payload;
      state.loading = false;
    },
    setUnauthenticated(state) {
      state.isAuthenticated = false;
      state.userProfile = null;
      state.loading = false;
    },
  },
});

export const { setAuthLoading, setAuthenticated, setUnauthenticated } = authSlice.actions;

export default authSlice.reducer;
