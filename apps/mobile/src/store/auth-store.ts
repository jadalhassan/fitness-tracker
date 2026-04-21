import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "@athletica/shared";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  user: User | null;
  onboardingComplete: boolean;
  hasHydrated: boolean;
  setHydrated: (value: boolean) => void;
  signIn: (payload: { token: string; user: User }) => void;
  signOut: () => void;
  updateUser: (user: User) => void;
  completeOnboarding: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      onboardingComplete: false,
      hasHydrated: false,
      setHydrated: (value) => set({ hasHydrated: value }),
      signIn: ({ token, user }) => set({ token, user }),
      signOut: () => set({ token: null, user: null, onboardingComplete: false }),
      updateUser: (user) => set({ user }),
      completeOnboarding: () => set({ onboardingComplete: true })
    }),
    {
      name: "athletica-auth",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
