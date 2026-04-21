import axios from "axios";
import { useAuthStore } from "../store/auth-store";

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
