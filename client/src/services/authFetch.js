import keycloak from "../keycloak";

const DEFAULT_MIN_VALIDITY_SECONDS = 30;

export const ensureFreshToken = async (
  minValiditySeconds = DEFAULT_MIN_VALIDITY_SECONDS,
) => {
  if (!keycloak?.authenticated) return null;

  try {
    await keycloak.updateToken(minValiditySeconds);
  } catch {
    // If refresh fails (offline, session ended, etc.), fall back to current token.
  }

  return keycloak.token || null;
};

export const authFetch = async (input, init = {}, options = {}) => {
  const token = await ensureFreshToken(
    options?.minValiditySeconds ?? DEFAULT_MIN_VALIDITY_SECONDS,
  );

  const headers = new Headers(init?.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, { ...init, headers });
};

