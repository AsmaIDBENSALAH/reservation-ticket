const encoder = new TextEncoder();
const decoder = new TextDecoder();

const TOKEN_SECRET = import.meta.env.VITE_TOKEN_COOKIE_SECRET ?? "match-frontend-default-token-secret";

const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));

const fromBase64 = (value: string): Uint8Array => {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
};

const getAesKey = async (): Promise<CryptoKey> => {
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(TOKEN_SECRET));

  return crypto.subtle.importKey("raw", hash, "AES-GCM", false, ["encrypt", "decrypt"]);
};

export const encryptValue = async (value: string): Promise<string> => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getAesKey();

  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(value));

  return `${toBase64(iv)}.${toBase64(new Uint8Array(encrypted))}`;
};

export const decryptValue = async (encryptedValue: string): Promise<string | null> => {
  try {
    const [ivValue, cipherValue] = encryptedValue.split(".");

    if (!ivValue || !cipherValue) {
      return null;
    }

    const iv = fromBase64(ivValue);
    const cipher = fromBase64(cipherValue);
    const key = await getAesKey();

    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);

    return decoder.decode(decrypted);
  } catch {
    return null;
  }
};
