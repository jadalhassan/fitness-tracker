import type { AuthPayload, User } from "@athletica/shared";
import { demoUser } from "../data/demo-data";
import { apiClient } from "./client";

export async function login(email: string, password: string): Promise<AuthPayload> {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data.data as AuthPayload;
  } catch {
    if (email.toLowerCase() === "demo@athletica.app" && password === "Demo1234!") {
      return {
        token: "demo-token",
        user: demoUser
      };
    }

    throw new Error("Unable to sign in. Check your credentials or API connection.");
  }
}

export async function register(payload: Record<string, unknown>): Promise<AuthPayload> {
  try {
    const response = await apiClient.post("/auth/register", payload);
    return response.data.data as AuthPayload;
  } catch {
    return {
      token: "demo-token",
      user: demoUser
    };
  }
}

export async function forgotPassword(email: string) {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data.data as { token: string; expiresAt: string };
}

export async function fetchMe(): Promise<User> {
  const response = await apiClient.get("/auth/me");
  return response.data.data as User;
}
