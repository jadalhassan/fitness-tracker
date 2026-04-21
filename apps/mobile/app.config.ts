import type { ExpoConfig } from "expo/config";

const fallbackBundleId = "com.athletica.mobile";
const fallbackApiUrl = "http://localhost:4000/api/v1";

const config: ExpoConfig = {
  name: process.env.EXPO_APP_NAME ?? "Athletica",
  slug: process.env.EXPO_APP_SLUG ?? "athletica-fitness-tracker",
  scheme: process.env.EXPO_APP_SCHEME ?? "athletica",
  version: process.env.EXPO_APP_VERSION ?? "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  plugins: ["expo-font"],
  splash: {
    backgroundColor: "#06070A"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: process.env.EXPO_IOS_BUNDLE_IDENTIFIER ?? fallbackBundleId
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#06070A"
    },
    package: process.env.EXPO_ANDROID_PACKAGE ?? fallbackBundleId
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? fallbackApiUrl,
    ...(process.env.EXPO_EAS_PROJECT_ID
      ? {
          eas: {
            projectId: process.env.EXPO_EAS_PROJECT_ID
          }
        }
      : {})
  }
};

export default config;
