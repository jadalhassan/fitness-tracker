import mongoose from "mongoose";

const RunningSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    pace: { type: String, required: true },
    splits: [{ type: String, required: true }],
    gpsReady: { type: Boolean, default: true },
    notes: { type: String },
    createdAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const RunningSessionModel = mongoose.model(
  "RunningSession",
  RunningSessionSchema
);
