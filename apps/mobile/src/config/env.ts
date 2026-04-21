import Constants from "expo-constants";

type ExpoExtra = {
  apiUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;
const processEnv = (
  globalThis as {
    process?: {
      env?: Record<string, string | undefined>;
    };
  }
).process?.env;

export const env = {
  apiUrl: processEnv?.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? "http://localhost:4000/api/v1"
};
