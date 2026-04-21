import type { Discipline, FitnessLevel } from "@athletica/shared";
import { starterPlans } from "../data/starter-plans.js";

export function suggestStarterPlan(
  preferredDisciplines: Discipline[],
  fitnessLevel: FitnessLevel
) {
  if (preferredDisciplines.some((discipline) => ["mma", "boxing", "wrestling", "kickboxing", "bjj"].includes(discipline))) {
    return starterPlans[1];
  }

  if (preferredDisciplines.includes("calisthenics")) {
    return starterPlans[2];
  }

  if (preferredDisciplines.includes("running")) {
    return starterPlans[3];
  }

  return fitnessLevel === "beginner" ? starterPlans[0] : starterPlans[3];
}
