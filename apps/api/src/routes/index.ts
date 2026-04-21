import { Router } from "express";
import { analyticsRouter } from "./analytics.routes.js";
import { authRouter } from "./auth.routes.js";
import { calisthenicsRouter } from "./calisthenics.routes.js";
import { exercisesRouter } from "./exercises.routes.js";
import { mmaRouter } from "./mma.routes.js";
import { profileRouter } from "./profile.routes.js";
import { recoveryRouter } from "./recovery.routes.js";
import { runningRouter } from "./running.routes.js";
import { settingsRouter } from "./settings.routes.js";
import { workoutRouter } from "./workout.routes.js";
import { exerciseCatalogStats } from "../data/exercise-catalog.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      catalog: exerciseCatalogStats
    }
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/exercises", exercisesRouter);
apiRouter.use("/workouts", workoutRouter);
apiRouter.use("/running", runningRouter);
apiRouter.use("/mma", mmaRouter);
apiRouter.use("/calisthenics", calisthenicsRouter);
apiRouter.use("/recovery", recoveryRouter);
apiRouter.use("/analytics", analyticsRouter);
