import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { CalisthenicsProgressModel } from "../models/CalisthenicsProgress.js";

const calisthenicsSchema = z.object({
  skill: z.enum([
    "pull-up",
    "push-up",
    "dip",
    "muscle-up",
    "handstand",
    "front-lever",
    "back-lever",
    "planche",
    "core-hold",
    "mobility"
  ]),
  currentLevel: z.string(),
  targetLevel: z.string(),
  bestMetric: z.string(),
  notes: z.string().optional()
});

export const calisthenicsRouter = Router();

calisthenicsRouter.use(requireAuth);

calisthenicsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await CalisthenicsProgressModel.find({ userId: req.user!.id })
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: serializeList(items)
    });
  })
);

calisthenicsRouter.post(
  "/",
  validateBody(calisthenicsSchema),
  asyncHandler(async (req, res) => {
    const item = await CalisthenicsProgressModel.create({
      ...req.body,
      userId: req.user!.id,
      updatedAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: "Calisthenics progress updated",
      data: serialize(item)
    });
  })
);
