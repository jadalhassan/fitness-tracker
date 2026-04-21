import type { Discipline, FitnessLevel, GoalType } from "@athletica/shared";
import { create } from "zustand";

type OnboardingState = {
  goals: GoalType[];
  fitnessLevel: FitnessLevel;
  disciplines: Discipline[];
  equipment: string[];
  weeklyFrequency: number;
  heightCm: string;
  weightKg: string;
  age: string;
  setGoals: (goals: GoalType[]) => void;
  setFitnessLevel: (value: FitnessLevel) => void;
  setDisciplines: (disciplines: Discipline[]) => void;
  setEquipment: (equipment: string[]) => void;
  setField: (field: "weeklyFrequency" | "heightCm" | "weightKg" | "age", value: number | string) => void;
  reset: () => void;
};

const initialState = {
  goals: ["boost-athleticism" as GoalType],
  fitnessLevel: "beginner" as FitnessLevel,
  disciplines: ["gym" as Discipline, "running" as Discipline],
  equipment: ["dumbbells", "bench"],
  weeklyFrequency: 4,
  heightCm: "178",
  weightKg: "78",
  age: "27"
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setGoals: (goals) => set({ goals }),
  setFitnessLevel: (fitnessLevel) => set({ fitnessLevel }),
  setDisciplines: (disciplines) => set({ disciplines }),
  setEquipment: (equipment) => set({ equipment }),
  setField: (field, value) => set({ [field]: value } as Partial<OnboardingState>),
  reset: () => set(initialState)
}));
