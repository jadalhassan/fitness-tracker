import mongoose from "mongoose";
import {
  AchievementSchema,
  GoalSchema,
  NotificationPreferenceSchema,
  ProfileSchema
} from "./shared-schemas.js";

const UserSettingsSchema = new mongoose.Schema(
  {
    units: { type: String, default: "metric" },
    theme: { type: String, default: "dark" },
    notifications: { type: NotificationPreferenceSchema, required: true },
    privacyMode: { type: Boolean, default: false }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    streak: { type: Number, default: 0 },
    goals: [GoalSchema],
    profile: { type: ProfileSchema, required: true },
    settings: { type: UserSettingsSchema, required: true },
    achievements: [AchievementSchema],
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpiresAt: { type: Date, select: false }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
