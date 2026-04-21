import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { RecoveryLogModel } from "../models/RecoveryLog.js";

const recoverySchema = z.object({
  sleepHours: z.number().min(0).max(16),
  mood: z.number().min(1).max(10),
  soreness: z.number().min(1).max(10),
  energy: z.number().min(1).max(10),
  readinessScore: z.number().min(1).max(100),
  stretchingMinutes: z.number().min(0).max(180),
  notes: z.string().optional()
});

export const recoveryRouter = Router();

recoveryRouter.use(requireAuth);

recoveryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const logs = await RecoveryLogModel.find({ userId: req.user!.id })
      .sort({ createdAt: -1 })
      .limit(21)
      .lean();

    res.json({
      success: true,
      data: serializeList(logs)
    });
  })
);

recoveryRouter.post(
  "/",
  validateBody(recoverySchema),
  asyncHandler(async (req, res) => {
    const log = await RecoveryLogModel.create({
      ...req.body,
      userId: req.user!.id,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: "Recovery log added",
      data: serialize(log)
    });
  })
);
