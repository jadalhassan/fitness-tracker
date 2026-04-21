import { ProgressMetricModel } from "../models/ProgressMetric.js";
import { RecoveryLogModel } from "../models/RecoveryLog.js";
import { RunningSessionModel } from "../models/RunningSession.js";
import { UserModel } from "../models/User.js";
import { WorkoutSessionModel } from "../models/WorkoutSession.js";

function sum(values: number[]) {
  return values.reduce((accumulator, current) => accumulator + current, 0);
}

export async function getAnalyticsOverview(userId: string) {
  const [user, workouts, runs, recovery, weightMetrics] = await Promise.all([
    UserModel.findById(userId).lean(),
    WorkoutSessionModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),
    RunningSessionModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean(),
    RecoveryLogModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(7)
      .lean(),
    ProgressMetricModel.find({ userId, metric: "weight" })
      .sort({ recordedAt: -1 })
      .limit(8)
      .lean()
  ]);

  return {
    weeklyVolume: sum(workouts.map((session) => session.volumeKg ?? 0)),
    weeklySessions: workouts.length,
    weeklyDistanceKm: Number(
      sum(runs.map((session) => session.distanceKm)).toFixed(1)
    ),
    readinessTrend: recovery.map((entry) => entry.readinessScore).reverse(),
    weightTrend: weightMetrics.map((entry) => entry.value).reverse(),
    streak: user?.streak ?? 0,
    prs: workouts.flatMap((session) => session.personalRecords ?? []).slice(0, 4)
  };
}

export async function getTrendForMetric(userId: string, metric: string) {
  const records = await ProgressMetricModel.find({ userId, metric })
    .sort({ recordedAt: 1 })
    .lean();

  return records.map((record) => ({
    label: record.label,
    value: record.value,
    unit: record.unit,
    recordedAt: record.recordedAt
  }));
}
