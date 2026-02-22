interface SecureCookieOptions {
  maxAgeSeconds?: number;
  path?: string;
}

export const setSecureCookie = (name: string, value: string, options: SecureCookieOptions = {}): void => {
  const { maxAgeSeconds = 300, path = "/" } = options;

  document.cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAgeSeconds}; SameSite=Strict; Secure`;
};

export const getCookie = (name: string): string | null => {
  const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
};

export const removeCookie = (name: string, path = "/"): void => {
  document.cookie = `${name}=; Path=${path}; Max-Age=0; SameSite=Strict; Secure`;
};
