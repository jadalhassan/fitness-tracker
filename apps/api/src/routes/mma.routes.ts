import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { MMASessionModel } from "../models/MMASession.js";

const mmaSessionSchema = z.object({
  title: z.string(),
  mode: z.enum([
    "bag-rounds",
    "pad-work",
    "shadow-boxing",
    "sparring",
    "wrestling-rounds",
    "bjj-drills",
    "conditioning-rounds"
  ]),
  rounds: z.number().min(1).max(20),
  roundLengthSeconds: z.number().min(60).max(600),
  restSeconds: z.number().min(15).max(300),
  intensity: z.number().min(1).max(10),
  skillTags: z.array(z.string()).default([]),
  coachNotes: z.string().optional()
});

export const mmaRouter = Router();

mmaRouter.use(requireAuth);

mmaRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const sessions = await MMASessionModel.find({ userId: req.user!.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: serializeList(sessions)
    });
  })
);

mmaRouter.post(
  "/",
  validateBody(mmaSessionSchema),
  asyncHandler(async (req, res) => {
    const session = await MMASessionModel.create({
      ...req.body,
      userId: req.user!.id,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: "MMA session logged",
      data: serialize(session)
    });
  })
);
