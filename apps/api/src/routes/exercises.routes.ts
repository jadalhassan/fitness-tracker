import { Router } from "express";
import { asyncHandler } from "../lib/async-handler.js";
import { ApiError } from "../lib/api-error.js";
import { serialize, serializeList } from "../lib/serialize.js";
import { ExerciseModel } from "../models/Exercise.js";

export const exercisesRouter = Router();

exercisesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const { discipline, category, search } = req.query;
    const filters: Record<string, unknown> = {};

    if (discipline) {
      filters.discipline = discipline;
    }

    if (category) {
      filters.category = category;
    }

    if (search) {
      filters.name = { $regex: String(search), $options: "i" };
    }

    const exercises = await ExerciseModel.find(filters).limit(200).lean();

    res.json({
      success: true,
      data: {
        items: serializeList(exercises),
        total: exercises.length
      }
    });
  })
);

exercisesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const exercise = await ExerciseModel.findOne({ id: req.params.id }).lean();
    if (!exercise) {
      throw new ApiError(404, "Exercise not found");
    }

    res.json({
      success: true,
      data: serialize(exercise)
    });
  })
);
