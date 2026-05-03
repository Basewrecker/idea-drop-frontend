import axios from "axios";
import { getStoredAccessToken } from "./authToken";

const apiBaseUrl = (
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_PRODUCTION_URL}/api`
    : `${import.meta.env.VITE_API_URL}/api`
).trim();

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// refresh tokens after they expire

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.message?.status === 401) {
      console.log(originalRequest);
    }
  },
);

export default api;
