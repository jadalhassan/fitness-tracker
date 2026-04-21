import mongoose from "mongoose";

const RecoveryLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sleepHours: { type: Number, required: true },
    mood: { type: Number, required: true },
    soreness: { type: Number, required: true },
    energy: { type: Number, required: true },
    readinessScore: { type: Number, required: true },
    stretchingMinutes: { type: Number, required: true },
    notes: { type: String },
    createdAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const RecoveryLogModel = mongoose.model("RecoveryLog", RecoveryLogSchema);
