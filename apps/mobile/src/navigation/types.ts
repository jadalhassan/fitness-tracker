import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  GoalSelection: undefined;
  ProfileSetup: undefined;
  PlanSuggestion: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Train: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ExerciseBrowser: undefined;
  ExerciseDetail: { exerciseId: string };
  WorkoutBuilder: undefined;
  LiveWorkout: undefined;
  RunningTracker: undefined;
  MMATracker: undefined;
  CalisthenicsTracker: undefined;
  RecoveryTracker: undefined;
  Settings: undefined;
  Notifications: undefined;
  Subscription: undefined;
};
