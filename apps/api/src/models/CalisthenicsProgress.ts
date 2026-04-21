import mongoose from "mongoose";

const CalisthenicsProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    skill: { type: String, required: true },
    currentLevel: { type: String, required: true },
    targetLevel: { type: String, required: true },
    bestMetric: { type: String, required: true },
    notes: { type: String },
    updatedAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const CalisthenicsProgressModel = mongoose.model(
  "CalisthenicsProgress",
  CalisthenicsProgressSchema
);
