import Constants from "expo-constants";

type ExpoExtra = {
  apiUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? "http://localhost:4000/api/v1"
};
