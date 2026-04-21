import { Router } from "express";
import { asyncHandler } from "../lib/async-handler.js";
import { requireAuth } from "../middleware/auth.js";
import { getAnalyticsOverview, getTrendForMetric } from "../services/analytics.service.js";

export const analyticsRouter = Router();

analyticsRouter.use(requireAuth);

analyticsRouter.get(
  "/overview",
  asyncHandler(async (req, res) => {
    res.json({
      success: true,
      data: await getAnalyticsOverview(req.user!.id)
    });
  })
);

analyticsRouter.get(
  "/trends",
  asyncHandler(async (req, res) => {
    const metric = String(req.query.metric ?? "weight");

    res.json({
      success: true,
      data: await getTrendForMetric(req.user!.id, metric)
    });
  })
);
