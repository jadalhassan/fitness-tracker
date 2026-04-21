import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    category: { type: String, required: true },
    discipline: { type: String, required: true, index: true },
    muscleGroups: [{ type: String, required: true }],
    equipment: [{ type: String, required: true }],
    difficulty: { type: String, required: true },
    instructions: [{ type: String, required: true }],
    tips: [{ type: String, required: true }],
    commonMistakes: [{ type: String, required: true }],
    progressionLevel: { type: String, required: true },
    restGuidance: { type: String, required: true },
    estimatedCalories: { type: Number, required: true },
    tags: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema);
