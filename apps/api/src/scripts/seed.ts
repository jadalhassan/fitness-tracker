import { hashPassword } from "../lib/auth.js";
import { connectDb } from "../config/db.js";
import { exerciseCatalog } from "../data/exercise-catalog.js";
import { starterPlans } from "../data/starter-plans.js";
import { CalisthenicsProgressModel } from "../models/CalisthenicsProgress.js";
import { ExerciseModel } from "../models/Exercise.js";
import { MMASessionModel } from "../models/MMASession.js";
import { ProgressMetricModel } from "../models/ProgressMetric.js";
import { RecoveryLogModel } from "../models/RecoveryLog.js";
import { RunningSessionModel } from "../models/RunningSession.js";
import { UserModel } from "../models/User.js";
import { WorkoutSessionModel } from "../models/WorkoutSession.js";
import { WorkoutTemplateModel } from "../models/WorkoutTemplate.js";

async function seed() {
  await connectDb();

  await Promise.all([
    UserModel.deleteMany({}),
    ExerciseModel.deleteMany({}),
    WorkoutTemplateModel.deleteMany({}),
    WorkoutSessionModel.deleteMany({}),
    RunningSessionModel.deleteMany({}),
    MMASessionModel.deleteMany({}),
    CalisthenicsProgressModel.deleteMany({}),
    RecoveryLogModel.deleteMany({}),
    ProgressMetricModel.deleteMany({})
  ]);

  const user = await UserModel.create({
    email: "demo@athletica.app",
    password: await hashPassword("Demo1234!"),
    fullName: "Jordan Hayes",
    firstName: "Jordan",
    lastName: "Hayes",
    streak: 9,
    goals: [
      {
        type: "boost-athleticism",
        title: "Hybrid performance block",
        target: "Train 5 times weekly with one run and one fight session"
      }
    ],
    profile: {
      heightCm: 180,
      weightKg: 82,
      age: 29,
      weeklyFrequency: 5,
      fitnessLevel: "intermediate",
      preferredDisciplines: ["gym", "running", "boxing", "calisthenics"],
      equipmentAvailability: ["barbell", "dumbbells", "bench", "pull-up bar", "heavy bag"]
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
        reminderTime: "06:30"
      }
    },
    achievements: [
      {
        title: "9-Day Streak",
        description: "Showed up nine days in a row.",
        icon: "flame",
        progress: 100,
        unlockedAt: new Date().toISOString()
      },
      {
        title: "First 10K Volume Week",
        description: "Logged over 10,000 kg of weekly training volume.",
        icon: "trophy",
        progress: 85
      }
    ]
  });

  await ExerciseModel.insertMany(exerciseCatalog);

  const chestPress = exerciseCatalog.find((exercise) => exercise.name === "Barbell Bench Press")!;
  const squat = exerciseCatalog.find((exercise) => exercise.name === "Back Squat")!;
  const row = exerciseCatalog.find((exercise) => exercise.name === "Barbell Row")!;

  const template = await WorkoutTemplateModel.create({
    userId: user._id,
    title: "Athletic Upper Strength",
    discipline: "gym",
    description: "Push-pull upper body session with crisp strength work and accessories.",
    warmup: ["5 min assault bike", "band pull-aparts", "scap push-ups"],
    cooldown: ["Lat stretch", "pec doorway stretch", "box breathing"],
    estimatedDurationMinutes: 70,
    favorite: true,
    exercises: [
      {
        exerciseId: chestPress.id,
        exerciseName: chestPress.name,
        sets: 5,
        reps: "5",
        weight: "92.5 kg",
        restSeconds: 150
      },
      {
        exerciseId: row.id,
        exerciseName: row.name,
        sets: 4,
        reps: "8",
        weight: "70 kg",
        restSeconds: 90
      }
    ]
  });

  await WorkoutSessionModel.create({
    userId: user._id,
    templateId: template._id,
    discipline: "gym",
    title: "Athletic Upper Strength",
    startedAt: new Date(Date.now() - 1000 * 60 * 82).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    durationMinutes: 70,
    volumeKg: 10860,
    personalRecords: ["Bench press top set matched 5RM"],
    notes: "Felt sharp after extra sleep.",
    exercises: [
      {
        exerciseId: chestPress.id,
        exerciseName: chestPress.name,
        sets: [
          {
            setNumber: 1,
            targetReps: "5",
            actualReps: 5,
            targetWeight: 92.5,
            actualWeight: 92.5,
            completed: true,
            restSeconds: 150
          }
        ]
      }
    ]
  });

  await WorkoutSessionModel.create({
    userId: user._id,
    discipline: "powerlifting",
    title: "Lower Power Block",
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
    durationMinutes: 74,
    volumeKg: 12450,
    personalRecords: ["Paused squat volume PR"],
    notes: "Paused work exposed bracing leaks.",
    exercises: [
      {
        exerciseId: squat.id,
        exerciseName: squat.name,
        sets: [
          {
            setNumber: 1,
            targetReps: "4",
            actualReps: 4,
            targetWeight: 135,
            actualWeight: 135,
            completed: true,
            restSeconds: 180
          }
        ]
      }
    ]
  });

  await RunningSessionModel.insertMany([
    {
      userId: user._id,
      type: "outdoor-run",
      title: "Thursday Tempo",
      distanceKm: 6.4,
      durationMinutes: 34,
      pace: "5:19 /km",
      splits: ["5:28", "5:21", "5:18", "5:15", "5:10", "5:08"],
      gpsReady: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      userId: user._id,
      type: "long-run",
      title: "Weekend Aerobic Builder",
      distanceKm: 10.2,
      durationMinutes: 58,
      pace: "5:41 /km",
      splits: ["5:48", "5:43", "5:42", "5:41", "5:40"],
      gpsReady: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    }
  ]);

  await MMASessionModel.create({
    userId: user._id,
    title: "Pad Work Engine",
    mode: "pad-work",
    rounds: 8,
    roundLengthSeconds: 180,
    restSeconds: 45,
    intensity: 8,
    skillTags: ["jab-cross-low-kick", "exit-angle", "defense"],
    coachNotes: "Sharper exits after the right hand.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString()
  });

  await CalisthenicsProgressModel.insertMany([
    {
      userId: user._id,
      skill: "muscle-up",
      currentLevel: "Band-assisted doubles",
      targetLevel: "Strict single rep",
      bestMetric: "2 clean assisted reps",
      notes: "Transition timing improved on rings.",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
      userId: user._id,
      skill: "handstand",
      currentLevel: "30-second wall hold",
      targetLevel: "10-second freestanding hold",
      bestMetric: "26 seconds chest-to-wall",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
    }
  ]);

  await RecoveryLogModel.insertMany([
    {
      userId: user._id,
      sleepHours: 8.2,
      mood: 8,
      soreness: 4,
      energy: 8,
      readinessScore: 82,
      stretchingMinutes: 18,
      notes: "Low resting heart rate this morning.",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
    },
    {
      userId: user._id,
      sleepHours: 6.7,
      mood: 6,
      soreness: 6,
      energy: 6,
      readinessScore: 67,
      stretchingMinutes: 12,
      notes: "Travel day, still got a short mobility session in.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    }
  ]);

  await ProgressMetricModel.insertMany([
    {
      userId: user._id,
      metric: "weight",
      label: "Bodyweight",
      value: 83.4,
      unit: "kg",
      recordedAt: "2026-03-10"
    },
    {
      userId: user._id,
      metric: "weight",
      label: "Bodyweight",
      value: 82.9,
      unit: "kg",
      recordedAt: "2026-03-24"
    },
    {
      userId: user._id,
      metric: "weight",
      label: "Bodyweight",
      value: 82.2,
      unit: "kg",
      recordedAt: "2026-04-07"
    },
    {
      userId: user._id,
      metric: "weight",
      label: "Bodyweight",
      value: 81.8,
      unit: "kg",
      recordedAt: "2026-04-21"
    },
    {
      userId: user._id,
      metric: "strength",
      label: "Bench Press Estimated 1RM",
      value: 112,
      unit: "kg",
      recordedAt: "2026-04-21"
    }
  ]);

  console.log("Athletica seed complete");
  console.log(`Starter plans: ${starterPlans.length}`);
  console.log(`Exercises inserted: ${exerciseCatalog.length}`);
  console.log("Demo login: demo@athletica.app / Demo1234!");
}

void seed().then(() => process.exit(0));
