import mongoose from "mongoose";

const ProgressMetricSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    metric: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String, required: true },
    recordedAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const ProgressMetricModel = mongoose.model(
  "ProgressMetric",
  ProgressMetricSchema
);
