import mongoose from "mongoose";

const WorkoutTemplateExerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true },
    exerciseName: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    weight: { type: String },
    restSeconds: { type: Number, required: true },
    notes: { type: String }
  },
  { _id: false }
);

const WorkoutTemplateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    discipline: { type: String, required: true },
    description: { type: String, required: true },
    warmup: [{ type: String, required: true }],
    cooldown: [{ type: String, required: true }],
    notes: { type: String },
    estimatedDurationMinutes: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    exercises: [WorkoutTemplateExerciseSchema]
  },
  { timestamps: true }
);

export const WorkoutTemplateModel = mongoose.model(
  "WorkoutTemplate",
  WorkoutTemplateSchema
);
