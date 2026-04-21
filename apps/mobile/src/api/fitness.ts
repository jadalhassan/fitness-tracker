import type {
  AnalyticsOverview,
  CalisthenicsProgress,
  Exercise,
  MMASession,
  RecoveryLog,
  RunningSession,
  WorkoutSession,
  WorkoutTemplate
} from "@athletica/shared";
import {
  analyticsOverview,
  calisthenicsProgress,
  demoUser,
  featuredExercises,
  mmaSessions,
  recoveryLogs,
  runningSessions,
  suggestedPlan,
  workoutSessions,
  workoutTemplates
} from "../data/demo-data";
import { apiClient } from "./client";

export async function getDashboardBundle() {
  try {
    const [profile, templates, sessions, recovery, overview] = await Promise.all([
      apiClient.get("/profile"),
      apiClient.get("/workouts/templates"),
      apiClient.get("/workouts/sessions"),
      apiClient.get("/recovery"),
      apiClient.get("/analytics/overview")
    ]);

    return {
      profile: profile.data.data,
      templates: templates.data.data as WorkoutTemplate[],
      sessions: sessions.data.data as WorkoutSession[],
      recovery: recovery.data.data as RecoveryLog[],
      overview: overview.data.data as AnalyticsOverview
    };
  } catch {
    return {
      profile: {
        ...demoUser,
        suggestedPlan
      },
      templates: workoutTemplates,
      sessions: workoutSessions,
      recovery: recoveryLogs,
      overview: analyticsOverview
    };
  }
}

export async function getExercises(): Promise<Exercise[]> {
  try {
    const response = await apiClient.get("/exercises");
    return response.data.data.items as Exercise[];
  } catch {
    return featuredExercises;
  }
}

export async function getExercise(id: string): Promise<Exercise> {
  try {
    const response = await apiClient.get(`/exercises/${id}`);
    return response.data.data as Exercise;
  } catch {
    return featuredExercises.find((exercise) => exercise.id === id) ?? featuredExercises[0];
  }
}

export async function getWorkoutTemplates(): Promise<WorkoutTemplate[]> {
  try {
    const response = await apiClient.get("/workouts/templates");
    return response.data.data as WorkoutTemplate[];
  } catch {
    return workoutTemplates;
  }
}

export async function getWorkoutSessions(): Promise<WorkoutSession[]> {
  try {
    const response = await apiClient.get("/workouts/sessions");
    return response.data.data as WorkoutSession[];
  } catch {
    return workoutSessions;
  }
}

export async function getRunningSessions(): Promise<RunningSession[]> {
  try {
    const response = await apiClient.get("/running");
    return response.data.data as RunningSession[];
  } catch {
    return runningSessions;
  }
}

export async function getMMASessions(): Promise<MMASession[]> {
  try {
    const response = await apiClient.get("/mma");
    return response.data.data as MMASession[];
  } catch {
    return mmaSessions;
  }
}

export async function getRecoveryLogs(): Promise<RecoveryLog[]> {
  try {
    const response = await apiClient.get("/recovery");
    return response.data.data as RecoveryLog[];
  } catch {
    return recoveryLogs;
  }
}

export async function getCalisthenicsProgress(): Promise<CalisthenicsProgress[]> {
  try {
    const response = await apiClient.get("/calisthenics");
    return response.data.data as CalisthenicsProgress[];
  } catch {
    return calisthenicsProgress;
  }
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  try {
    const response = await apiClient.get("/analytics/overview");
    return response.data.data as AnalyticsOverview;
  } catch {
    return analyticsOverview;
  }
}
