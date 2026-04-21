import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { RunningSessionModel } from "../models/RunningSession.js";

const runningSessionSchema = z.object({
  type: z.enum(["outdoor-run", "indoor-run", "intervals", "long-run", "walk"]),
  title: z.string(),
  distanceKm: z.number().min(0.1),
  durationMinutes: z.number().min(1),
  pace: z.string(),
  splits: z.array(z.string()).default([]),
  gpsReady: z.boolean().default(true),
  notes: z.string().optional()
});

export const runningRouter = Router();

runningRouter.use(requireAuth);

runningRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const sessions = await RunningSessionModel.find({ userId: req.user!.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: serializeList(sessions)
    });
  })
);

runningRouter.post(
  "/",
  validateBody(runningSessionSchema),
  asyncHandler(async (req, res) => {
    const session = await RunningSessionModel.create({
      ...req.body,
      userId: req.user!.id,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: "Running session logged",
      data: serialize(session)
    });
  })
);
