import { Router } from "express";
import type { Discipline, FitnessLevel } from "@athletica/shared";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { ApiError } from "../lib/api-error.js";
import { serialize } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { UserModel } from "../models/User.js";
import { suggestStarterPlan } from "../services/plan.service.js";

const disciplineSchema = z.enum([
  "gym",
  "bodybuilding",
  "powerlifting",
  "calisthenics",
  "running",
  "walking",
  "mma",
  "boxing",
  "kickboxing",
  "wrestling",
  "bjj",
  "hiit",
  "home-workout",
  "stretching",
  "mobility",
  "recovery"
]);

const profileUpdateSchema = z.object({
  fullName: z.string().min(2).optional(),
  goals: z
    .array(
      z.object({
        type: z.string(),
        title: z.string(),
        target: z.string(),
        deadline: z.string().optional()
      })
    )
    .optional(),
  profile: z
    .object({
      age: z.number().min(13).max(90).optional(),
      heightCm: z.number().min(100).max(240).optional(),
      weightKg: z.number().min(35).max(250).optional(),
      weeklyFrequency: z.number().min(1).max(14).optional(),
      fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
      preferredDisciplines: z.array(disciplineSchema).optional(),
      equipmentAvailability: z.array(z.string()).optional(),
      avatarUrl: z.string().url().optional()
    })
    .optional()
});

export const profileRouter = Router();

profileRouter.use(requireAuth);

profileRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user!.id).lean();
    if (!user) {
      throw new ApiError(404, "Profile not found");
    }

    res.json({
      success: true,
      data: {
        ...serialize(user),
        suggestedPlan: suggestStarterPlan(
          user.profile.preferredDisciplines as Discipline[],
          user.profile.fitnessLevel as FitnessLevel
        )
      }
    });
  })
);

profileRouter.put(
  "/",
  validateBody(profileUpdateSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof profileUpdateSchema>;
    const user = await UserModel.findById(req.user!.id);

    if (!user) {
      throw new ApiError(404, "Profile not found");
    }

    if (payload.fullName) {
      user.fullName = payload.fullName;
    }

    if (payload.goals) {
      user.set("goals", payload.goals);
    }

    if (payload.profile) {
      Object.assign(user.profile, payload.profile);
    }

    await user.save();
    const updatedUser = await UserModel.findById(req.user!.id).lean();

    if (!updatedUser) {
      throw new ApiError(404, "Profile not found after update");
    }

    res.json({
      success: true,
      message: "Profile updated",
      data: serialize(updatedUser)
    });
  })
);
