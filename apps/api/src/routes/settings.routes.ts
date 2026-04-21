import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/async-handler.js";
import { ApiError } from "../lib/api-error.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { UserModel } from "../models/User.js";

const settingsSchema = z.object({
  units: z.enum(["metric", "imperial"]).optional(),
  theme: z.enum(["system", "dark", "light"]).optional(),
  privacyMode: z.boolean().optional(),
  notifications: z
    .object({
      workoutReminders: z.boolean().optional(),
      runningReminders: z.boolean().optional(),
      recoveryReminders: z.boolean().optional(),
      streakReminders: z.boolean().optional(),
      reminderTime: z.string().optional()
    })
    .optional()
});

export const settingsRouter = Router();

settingsRouter.use(requireAuth);

settingsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user!.id).lean();
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json({
      success: true,
      data: user.settings
    });
  })
);

settingsRouter.put(
  "/",
  validateBody(settingsSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof settingsSchema>;
    const user = await UserModel.findById(req.user!.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    Object.assign(user.settings, payload);
    if (payload.notifications) {
      Object.assign(user.settings.notifications, payload.notifications);
    }
    await user.save();

    res.json({
      success: true,
      message: "Settings updated",
      data: user.settings
    });
  })
);
