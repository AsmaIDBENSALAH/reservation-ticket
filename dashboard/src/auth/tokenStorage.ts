import { decryptValue, encryptValue } from "../utils/crypto";
import { getCookie, removeCookie, setSecureCookie } from "../utils/cookie";

const ACCESS_TOKEN_COOKIE = "__Secure-kc-at";
const REFRESH_TOKEN_COOKIE = "__Secure-kc-rt";

const TOKEN_TTL_SECONDS = 60 * 5;

export const storeTokens = async (accessToken: string, refreshToken?: string): Promise<void> => {
  const encryptedAccessToken = await encryptValue(accessToken);
  setSecureCookie(ACCESS_TOKEN_COOKIE, encryptedAccessToken, { maxAgeSeconds: TOKEN_TTL_SECONDS });

  if (refreshToken) {
    const encryptedRefreshToken = await encryptValue(refreshToken);
    setSecureCookie(REFRESH_TOKEN_COOKIE, encryptedRefreshToken, { maxAgeSeconds: TOKEN_TTL_SECONDS });
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  const encryptedToken = getCookie(ACCESS_TOKEN_COOKIE);

  if (!encryptedToken) {
    return null;
  }

  return decryptValue(encryptedToken);
};

export const clearTokens = (): void => {
  removeCookie(ACCESS_TOKEN_COOKIE);
  removeCookie(REFRESH_TOKEN_COOKIE);
};
