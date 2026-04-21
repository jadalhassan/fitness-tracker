import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { ApiError } from "../lib/api-error.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { WorkoutSessionModel } from "../models/WorkoutSession.js";
import { WorkoutTemplateModel } from "../models/WorkoutTemplate.js";

const templateSchema = z.object({
  title: z.string().min(2),
  discipline: z.string(),
  description: z.string().min(5),
  warmup: z.array(z.string()).min(1),
  cooldown: z.array(z.string()).min(1),
  notes: z.string().optional(),
  estimatedDurationMinutes: z.number().min(10).max(240),
  favorite: z.boolean().default(false),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      exerciseName: z.string(),
      sets: z.number().min(1),
      reps: z.string(),
      weight: z.string().optional(),
      restSeconds: z.number().min(10).max(600),
      notes: z.string().optional()
    })
  )
});

const startSessionSchema = z.object({
  templateId: z.string().optional(),
  discipline: z.string(),
  title: z.string(),
  notes: z.string().optional(),
  exercises: z.array(
    z.object({
      exerciseId: z.string(),
      exerciseName: z.string(),
      notes: z.string().optional(),
      sets: z.array(
        z.object({
          setNumber: z.number(),
          targetReps: z.string(),
          actualReps: z.number().default(0),
          targetWeight: z.number().optional(),
          actualWeight: z.number().optional(),
          completed: z.boolean().default(false),
          restSeconds: z.number(),
          completedAt: z.string().optional()
        })
      )
    })
  )
});

const completeSessionSchema = z.object({
  endedAt: z.string(),
  durationMinutes: z.number().min(1),
  volumeKg: z.number().min(0),
  personalRecords: z.array(z.string()).default([]),
  notes: z.string().optional(),
  exercises: startSessionSchema.shape.exercises
});

export const workoutRouter = Router();

workoutRouter.use(requireAuth);

workoutRouter.get(
  "/templates",
  asyncHandler(async (req, res) => {
    const templates = await WorkoutTemplateModel.find({ userId: req.user!.id })
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: serializeList(templates)
    });
  })
);

workoutRouter.post(
  "/templates",
  validateBody(templateSchema),
  asyncHandler(async (req, res) => {
    const template = await WorkoutTemplateModel.create({
      ...req.body,
      userId: req.user!.id
    });

    res.status(201).json({
      success: true,
      message: "Workout template created",
      data: serialize(template)
    });
  })
);

workoutRouter.put(
  "/templates/:id",
  validateBody(templateSchema),
  asyncHandler(async (req, res) => {
    const template = await WorkoutTemplateModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      req.body,
      { new: true }
    ).lean();

    if (!template) {
      throw new ApiError(404, "Workout template not found");
    }

    res.json({
      success: true,
      message: "Workout template updated",
      data: serialize(template)
    });
  })
);

workoutRouter.delete(
  "/templates/:id",
  asyncHandler(async (req, res) => {
    const template = await WorkoutTemplateModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.id
    }).lean();

    if (!template) {
      throw new ApiError(404, "Workout template not found");
    }

    res.json({
      success: true,
      message: "Workout template deleted",
      data: serialize(template)
    });
  })
);

workoutRouter.get(
  "/sessions",
  asyncHandler(async (req, res) => {
    const sessions = await WorkoutSessionModel.find({ userId: req.user!.id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: serializeList(sessions)
    });
  })
);

workoutRouter.post(
  "/sessions/start",
  validateBody(startSessionSchema),
  asyncHandler(async (req, res) => {
    const session = await WorkoutSessionModel.create({
      ...req.body,
      userId: req.user!.id,
      startedAt: new Date().toISOString(),
      personalRecords: []
    });

    res.status(201).json({
      success: true,
      message: "Workout session started",
      data: serialize(session)
    });
  })
);

workoutRouter.post(
  "/sessions/:id/complete",
  validateBody(completeSessionSchema),
  asyncHandler(async (req, res) => {
    const session = await WorkoutSessionModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      req.body,
      { new: true }
    ).lean();

    if (!session) {
      throw new ApiError(404, "Workout session not found");
    }

    res.json({
      success: true,
      message: "Workout session completed",
      data: serialize(session)
    });
  })
);
