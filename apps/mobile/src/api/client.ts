import axios from "axios";
import { env } from "../config/env";
import { useAuthStore } from "../store/auth-store";

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
