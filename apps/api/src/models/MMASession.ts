import mongoose from "mongoose";

const MMASessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    mode: { type: String, required: true },
    rounds: { type: Number, required: true },
    roundLengthSeconds: { type: Number, required: true },
    restSeconds: { type: Number, required: true },
    intensity: { type: Number, required: true },
    skillTags: [{ type: String, required: true }],
    coachNotes: { type: String },
    createdAt: { type: String, required: true }
  },
  { timestamps: true }
);

export const MMASessionModel = mongoose.model("MMASession", MMASessionSchema);
