import type { SuggestedPlan } from "@athletica/shared";

export const starterPlans: SuggestedPlan[] = [
  {
    id: "starter-strength-hybrid",
    title: "Starter Strength Hybrid",
    summary:
      "Three days of full-body strength plus two low-intensity recovery sessions.",
    focus: ["gym", "bodybuilding", "recovery"],
    durationWeeks: 6
  },
  {
    id: "combat-engine-builder",
    title: "Combat Engine Builder",
    summary:
      "Boxing rounds, wrestling movement, and interval conditioning to raise fight pace.",
    focus: ["boxing", "kickboxing", "wrestling", "mma"],
    durationWeeks: 8
  },
  {
    id: "calisthenics-skill-foundation",
    title: "Calisthenics Skill Foundation",
    summary:
      "Build pull-up capacity, handstand confidence, and core control with progressive volume.",
    focus: ["calisthenics", "mobility", "recovery"],
    durationWeeks: 8
  },
  {
    id: "run-lift-balance",
    title: "Run + Lift Balance",
    summary:
      "A hybrid plan for athletes who want stronger lifts without losing running fitness.",
    focus: ["running", "gym", "walking"],
    durationWeeks: 6
  }
];
