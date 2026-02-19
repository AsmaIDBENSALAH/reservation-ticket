import Keycloak, { type KeycloakProfile } from "keycloak-js";
import { clearTokens, storeTokens } from "./tokenStorage";
import { setAuthenticated, setAuthLoading, setUnauthenticated } from "../store/authSlice";
import type { AppDispatch } from "../store/store";

const keycloakConfig = {
  url: "http://localhost:8085/",
  realm: "football-realme",
  clientId: "match-frontend",
};

let keycloakInstance: Keycloak | null = null;
let refreshTimer: number | null = null;

const getKeycloak = (): Keycloak => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak(keycloakConfig);
  }

  return keycloakInstance;
};

const readProfile = async (keycloak: Keycloak): Promise<KeycloakProfile | null> => {
  try {
    return await keycloak.loadUserProfile();
  } catch {
    return null;
  }
};

const persistKeycloakTokens = async (keycloak: Keycloak): Promise<void> => {
  if (!keycloak.token) {
    return;
  }
console.log(keycloak.token);
  await storeTokens(keycloak.token, keycloak.refreshToken);
};

const clearRefreshTimer = (): void => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
    refreshTimer = null;
  }
};

const startRefreshTimer = (dispatch: AppDispatch): void => {
  clearRefreshTimer();

  refreshTimer = window.setInterval(async () => {
    await refreshToken(dispatch, 60);
  }, 15000);
};

export const initKeycloak = async (dispatch: AppDispatch): Promise<boolean> => {
  const keycloak = getKeycloak();

  dispatch(setAuthLoading(true));

  keycloak.onAuthSuccess = async () => {
    await persistKeycloakTokens(keycloak);
    const profile = await readProfile(keycloak);
    dispatch(setAuthenticated(profile));
  };

  keycloak.onAuthLogout = () => {
    clearTokens();
    dispatch(setUnauthenticated());
  };

  keycloak.onTokenExpired = () => {
    void refreshToken(dispatch, 30);
  };

  try {
    const authenticated = await keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: false,
      pkceMethod: "S256",
    });

    if (authenticated) {
      await persistKeycloakTokens(keycloak);
      const profile = await readProfile(keycloak);
      dispatch(setAuthenticated(profile));
      startRefreshTimer(dispatch);
      return true;
    }

    clearTokens();
    dispatch(setUnauthenticated());
    return false;
  } catch {
    clearTokens();
    dispatch(setUnauthenticated());
    return false;
  }
};

export const refreshToken = async (dispatch: AppDispatch, minValidity = 30): Promise<boolean> => {
  const keycloak = getKeycloak();

  if (!keycloak.authenticated) {
    return false;
  }

  try {
    await keycloak.updateToken(minValidity);
    await persistKeycloakTokens(keycloak);
    return true;
  } catch {
    clearTokens();
    dispatch(setUnauthenticated());
    return false;
  }
};

export const keycloakLogin = async (): Promise<void> => {
  const keycloak = getKeycloak();
  await keycloak.login({ redirectUri: `${window.location.origin}/dashboard` });
};

export const keycloakRegister = async (): Promise<void> => {
  const keycloak = getKeycloak();
  await keycloak.register({ redirectUri: `${window.location.origin}/dashboard` });
};

export const keycloakLogout = async (): Promise<void> => {
  clearRefreshTimer();
  clearTokens();

  const keycloak = getKeycloak();
  await keycloak.logout({ redirectUri: `${window.location.origin}/signin` });
};

export const getKeycloakInstance = (): Keycloak => getKeycloak();
