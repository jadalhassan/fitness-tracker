import mongoose from "mongoose";
import { ExerciseEntrySchema } from "./shared-schemas.js";

const WorkoutSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutTemplate" },
    discipline: { type: String, required: true },
    title: { type: String, required: true },
    startedAt: { type: String, required: true },
    endedAt: { type: String },
    durationMinutes: { type: Number },
    volumeKg: { type: Number },
    personalRecords: [{ type: String }],
    notes: { type: String },
    exercises: [ExerciseEntrySchema]
  },
  { timestamps: true }
);

export const WorkoutSessionModel = mongoose.model(
  "WorkoutSession",
  WorkoutSessionSchema
);
