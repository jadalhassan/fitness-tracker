import mongoose from "mongoose";

export const GoalSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    target: { type: String, required: true },
    deadline: { type: String }
  },
  { _id: false }
);

export const ProfileSchema = new mongoose.Schema(
  {
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    age: { type: Number, required: true },
    avatarUrl: { type: String },
    weeklyFrequency: { type: Number, required: true },
    fitnessLevel: { type: String, required: true },
    preferredDisciplines: [{ type: String, required: true }],
    equipmentAvailability: [{ type: String, required: true }]
  },
  { _id: false }
);

export const NotificationPreferenceSchema = new mongoose.Schema(
  {
    workoutReminders: { type: Boolean, default: true },
    runningReminders: { type: Boolean, default: true },
    recoveryReminders: { type: Boolean, default: true },
    streakReminders: { type: Boolean, default: true },
    reminderTime: { type: String, default: "07:00" }
  },
  { _id: false }
);

export const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    unlockedAt: { type: String },
    progress: { type: Number, default: 0 }
  },
  { _id: true }
);

export const SetEntrySchema = new mongoose.Schema(
  {
    setNumber: { type: Number, required: true },
    targetReps: { type: String, required: true },
    actualReps: { type: Number, required: true },
    targetWeight: { type: Number },
    actualWeight: { type: Number },
    completed: { type: Boolean, default: false },
    restSeconds: { type: Number, default: 90 },
    completedAt: { type: String }
  },
  { _id: false }
);

export const ExerciseEntrySchema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true },
    exerciseName: { type: String, required: true },
    notes: { type: String },
    sets: [SetEntrySchema]
  },
  { _id: false }
);
