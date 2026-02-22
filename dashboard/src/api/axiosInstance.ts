import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../auth/tokenStorage";
import { refreshToken } from "../auth/keycloak";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8084",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const { store } = await import("../store/store");
  await refreshToken(store.dispatch, 30);

  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { store } = await import("../store/store");
    const originalRequest = error.config as RetryableConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshed = await refreshToken(store.dispatch, 0);

      if (refreshed) {
        const token = await getAccessToken();

        if (token) {
          originalRequest.headers =
            originalRequest.headers ??
            ({} as InternalAxiosRequestConfig["headers"]);
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
