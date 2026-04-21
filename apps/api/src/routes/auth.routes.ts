import crypto from "node:crypto";
import { Router } from "express";
import { z } from "zod";
import { comparePassword, hashPassword, signToken } from "../lib/auth.js";
import { asyncHandler } from "../lib/async-handler.js";
import { ApiError } from "../lib/api-error.js";
import { serialize } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { UserModel } from "../models/User.js";
import { suggestStarterPlan } from "../services/plan.service.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  age: z.number().min(13).max(90).default(26),
  heightCm: z.number().min(100).max(240).default(178),
  weightKg: z.number().min(35).max(250).default(78),
  weeklyFrequency: z.number().min(1).max(14).default(4),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  preferredDisciplines: z
    .array(
      z.enum([
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
      ])
    )
    .default(["gym"]),
  equipmentAvailability: z.array(z.string()).default(["dumbbells", "bench"])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string().min(6),
  newPassword: z.string().min(8)
});

export const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof registerSchema>;
    const existingUser = await UserModel.findOne({ email: payload.email.toLowerCase() });

    if (existingUser) {
      throw new ApiError(409, "A user with that email already exists");
    }

    const starterPlan = suggestStarterPlan(
      payload.preferredDisciplines,
      payload.fitnessLevel
    );

    const user = await UserModel.create({
      email: payload.email.toLowerCase(),
      password: await hashPassword(payload.password),
      fullName: payload.fullName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      streak: 0,
      goals: [
        {
          type: "build-muscle",
          title: "Primary goal",
          target: starterPlan.title
        }
      ],
      profile: {
        age: payload.age,
        heightCm: payload.heightCm,
        weightKg: payload.weightKg,
        weeklyFrequency: payload.weeklyFrequency,
        fitnessLevel: payload.fitnessLevel,
        preferredDisciplines: payload.preferredDisciplines,
        equipmentAvailability: payload.equipmentAvailability
      },
      settings: {
        units: "metric",
        theme: "dark",
        privacyMode: false,
        notifications: {
          workoutReminders: true,
          runningReminders: true,
          recoveryReminders: true,
          streakReminders: true,
          reminderTime: "07:00"
        }
      },
      achievements: [
        {
          title: "Joined Athletica",
          description: "Created your account and unlocked the first milestone.",
          icon: "spark",
          progress: 100,
          unlockedAt: new Date().toISOString()
        }
      ]
    });

    const safeUser = await UserModel.findById(user._id).lean();

    res.status(201).json({
      success: true,
      message: "Account created",
      data: {
        token: signToken(String(user._id)),
        user: serialize(safeUser!)
      }
    });
  })
);

authRouter.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof loginSchema>;
    const user = await UserModel.findOne({ email: payload.email.toLowerCase() })
      .select("+password")
      .lean();

    if (!user || !(await comparePassword(payload.password, user.password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { password: _password, resetPasswordToken, resetPasswordExpiresAt, ...safeUser } =
      user;
    void _password;
    void resetPasswordToken;
    void resetPasswordExpiresAt;

    res.json({
      success: true,
      message: "Welcome back",
      data: {
        token: signToken(String(user._id)),
        user: serialize(safeUser)
      }
    });
  })
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user!.id).lean();
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.json({
      success: true,
      data: serialize(user)
    });
  })
);

authRouter.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof forgotPasswordSchema>;
    const user = await UserModel.findOne({ email: payload.email.toLowerCase() }).select(
      "+resetPasswordToken +resetPasswordExpiresAt"
    );

    if (!user) {
      throw new ApiError(404, "No user found for that email");
    }

    const token = crypto.randomBytes(3).toString("hex").toUpperCase();
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = new Date(Date.now() + 1000 * 60 * 15);
    await user.save();

    res.json({
      success: true,
      message: "Reset token created. Wire this into email/SMS later.",
      data: {
        token,
        expiresAt: user.resetPasswordExpiresAt.toISOString()
      }
    });
  })
);

authRouter.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  asyncHandler(async (req, res) => {
    const payload = req.body as z.infer<typeof resetPasswordSchema>;
    const user = await UserModel.findOne({ email: payload.email.toLowerCase() }).select(
      "+resetPasswordToken +resetPasswordExpiresAt +password"
    );

    if (!user) {
      throw new ApiError(404, "No user found for that email");
    }

    if (
      user.resetPasswordToken !== payload.token ||
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt.getTime() < Date.now()
    ) {
      throw new ApiError(400, "Reset token is invalid or expired");
    }

    user.password = await hashPassword(payload.newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
      data: null
    });
  })
);

authRouter.post("/logout", requireAuth, (_req, res) => {
  res.json({
    success: true,
    message: "Session cleared on client"
  });
});
