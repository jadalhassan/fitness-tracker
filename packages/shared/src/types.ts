export type Discipline =
  | "gym"
  | "bodybuilding"
  | "powerlifting"
  | "calisthenics"
  | "running"
  | "walking"
  | "mma"
  | "boxing"
  | "kickboxing"
  | "wrestling"
  | "bjj"
  | "hiit"
  | "home-workout"
  | "stretching"
  | "mobility"
  | "recovery";

export type GoalType =
  | "build-muscle"
  | "lose-fat"
  | "improve-endurance"
  | "boost-athleticism"
  | "master-skills"
  | "recover-better";

export type FitnessLevel = "beginner" | "intermediate" | "advanced";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ThemePreference = "system" | "dark" | "light";
export type UnitSystem = "metric" | "imperial";

export interface Goal {
  id: string;
  type: GoalType;
  title: string;
  target: string;
  deadline?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  discipline: Discipline;
  muscleGroups: string[];
  equipment: string[];
  difficulty: Difficulty;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  progressionLevel: string;
  restGuidance: string;
  estimatedCalories: number;
  tags: string[];
}

export interface WorkoutTemplateExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: string;
  weight?: string;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutTemplate {
  id: string;
  userId: string;
  title: string;
  discipline: Discipline;
  description: string;
  warmup: string[];
  cooldown: string[];
  notes?: string;
  estimatedDurationMinutes: number;
  favorite: boolean;
  exercises: WorkoutTemplateExercise[];
}

export interface SetEntry {
  setNumber: number;
  targetReps: string;
  actualReps: number;
  targetWeight?: number;
  actualWeight?: number;
  completed: boolean;
  restSeconds: number;
  completedAt?: string;
}

export interface ExerciseEntry {
  exerciseId: string;
  exerciseName: string;
  notes?: string;
  sets: SetEntry[];
}

export interface WorkoutSession {
  id: string;
  userId: string;
  templateId?: string;
  discipline: Discipline;
  title: string;
  startedAt: string;
  endedAt?: string;
  durationMinutes?: number;
  volumeKg?: number;
  personalRecords: string[];
  notes?: string;
  exercises: ExerciseEntry[];
}

export interface RunningSession {
  id: string;
  userId: string;
  type: "outdoor-run" | "indoor-run" | "intervals" | "long-run" | "walk";
  title: string;
  distanceKm: number;
  durationMinutes: number;
  pace: string;
  splits: string[];
  gpsReady: boolean;
  notes?: string;
  createdAt: string;
}

export interface MMASession {
  id: string;
  userId: string;
  title: string;
  mode:
    | "bag-rounds"
    | "pad-work"
    | "shadow-boxing"
    | "sparring"
    | "wrestling-rounds"
    | "bjj-drills"
    | "conditioning-rounds";
  rounds: number;
  roundLengthSeconds: number;
  restSeconds: number;
  intensity: number;
  skillTags: string[];
  coachNotes?: string;
  createdAt: string;
}

export interface CalisthenicsProgress {
  id: string;
  userId: string;
  skill:
    | "pull-up"
    | "push-up"
    | "dip"
    | "muscle-up"
    | "handstand"
    | "front-lever"
    | "back-lever"
    | "planche"
    | "core-hold"
    | "mobility";
  currentLevel: string;
  targetLevel: string;
  bestMetric: string;
  notes?: string;
  updatedAt: string;
}

export interface RecoveryLog {
  id: string;
  userId: string;
  sleepHours: number;
  mood: number;
  soreness: number;
  energy: number;
  readinessScore: number;
  stretchingMinutes: number;
  notes?: string;
  createdAt: string;
}

export interface ProgressMetric {
  id: string;
  userId: string;
  metric:
    | "weight"
    | "strength"
    | "endurance"
    | "frequency"
    | "volume"
    | "pr";
  label: string;
  value: number;
  unit: string;
  recordedAt: string;
}

export interface NotificationPreference {
  workoutReminders: boolean;
  runningReminders: boolean;
  recoveryReminders: boolean;
  streakReminders: boolean;
  reminderTime: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
}

export interface Profile {
  heightCm: number;
  weightKg: number;
  age: number;
  avatarUrl?: string;
  weeklyFrequency: number;
  fitnessLevel: FitnessLevel;
  preferredDisciplines: Discipline[];
  equipmentAvailability: string[];
}

export interface UserSettings {
  units: UnitSystem;
  theme: ThemePreference;
  notifications: NotificationPreference;
  privacyMode: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  streak: number;
  goals: Goal[];
  profile: Profile;
  settings: UserSettings;
  achievements: Achievement[];
}

export interface DailySummary {
  caloriesBurned: number;
  trainingMinutes: number;
  recoveryScore: number;
  dailyGoalProgress: number;
}

export interface AnalyticsOverview {
  weeklyVolume: number;
  weeklySessions: number;
  weeklyDistanceKm: number;
  readinessTrend: number[];
  weightTrend: number[];
  streak: number;
  prs: string[];
}

export interface SuggestedPlan {
  id: string;
  title: string;
  summary: string;
  focus: Discipline[];
  durationWeeks: number;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
