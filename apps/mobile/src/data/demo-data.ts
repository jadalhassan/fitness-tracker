import type {
  AnalyticsOverview,
  CalisthenicsProgress,
  Exercise,
  MMASession,
  RecoveryLog,
  RunningSession,
  SuggestedPlan,
  User,
  WorkoutSession,
  WorkoutTemplate
} from "@athletica/shared";

export const demoUser: User = {
  id: "demo-user",
  email: "demo@athletica.app",
  fullName: "Jordan Hayes",
  firstName: "Jordan",
  lastName: "Hayes",
  streak: 9,
  goals: [
    {
      id: "goal-1",
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
      id: "achievement-1",
      title: "9-Day Streak",
      description: "Showed up nine days in a row.",
      icon: "flame",
      progress: 100,
      unlockedAt: "2026-04-20T05:30:00.000Z"
    },
    {
      id: "achievement-2",
      title: "Fight Camp Engine",
      description: "Logged 3 combat sessions this week.",
      icon: "bolt",
      progress: 75
    }
  ]
};

export const suggestedPlan: SuggestedPlan = {
  id: "plan-1",
  title: "Run + Lift Balance",
  summary:
    "A six-week hybrid block that balances strength, intervals, and recovery without burnout.",
  focus: ["running", "gym", "walking"],
  durationWeeks: 6
};

export const featuredExercises: Exercise[] = [
  {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    category: "chest",
    discipline: "bodybuilding",
    muscleGroups: ["chest", "triceps", "front delts"],
    equipment: ["barbell", "bench"],
    difficulty: "intermediate",
    instructions: [
      "Set your feet and pull the shoulder blades into the bench.",
      "Lower with control to the sternum.",
      "Press back to lockout with even bar speed."
    ],
    tips: ["Create leg drive before the bar leaves the rack."],
    commonMistakes: ["Elbows flaring too early."],
    progressionLevel: "Base pressing strength",
    restGuidance: "Rest 2 minutes between working sets.",
    estimatedCalories: 46,
    tags: ["push-day", "strength"]
  },
  {
    id: "tempo-run",
    name: "Tempo Run",
    category: "running",
    discipline: "running",
    muscleGroups: ["cardio", "calves", "glutes"],
    equipment: ["running shoes"],
    difficulty: "beginner",
    instructions: ["Start controlled.", "Settle into threshold pace.", "Cool down gradually."],
    tips: ["Run by feel if GPS pace gets noisy."],
    commonMistakes: ["Going out too hard."],
    progressionLevel: "Threshold development",
    restGuidance: "Take 24 hours before your next hard lower-body session.",
    estimatedCalories: 82,
    tags: ["engine", "endurance"]
  },
  {
    id: "heavy-bag-power-round",
    name: "Heavy Bag Power Round",
    category: "boxing",
    discipline: "boxing",
    muscleGroups: ["shoulders", "core", "legs"],
    equipment: ["heavy bag", "gloves"],
    difficulty: "intermediate",
    instructions: ["Build rhythm with the jab.", "Explode through 3-4 punch bursts.", "Reset your stance after each exchange."],
    tips: ["Keep your shoulders relaxed between combinations."],
    commonMistakes: ["Standing tall on exits."],
    progressionLevel: "Fight pace power",
    restGuidance: "Work 3 minute rounds with 45 seconds rest.",
    estimatedCalories: 74,
    tags: ["striking", "conditioning"]
  },
  {
    id: "tuck-planche-hold",
    name: "Tuck Planche Hold",
    category: "bodyweight skills",
    discipline: "calisthenics",
    muscleGroups: ["shoulders", "core", "triceps"],
    equipment: ["parallettes"],
    difficulty: "advanced",
    instructions: ["Lean forward into protraction.", "Lift knees to chest.", "Hold a rounded hollow position."],
    tips: ["Shorter high-quality holds beat sloppy max attempts."],
    commonMistakes: ["Losing shoulder protraction."],
    progressionLevel: "Static strength",
    restGuidance: "Rest 90-120 seconds between hold attempts.",
    estimatedCalories: 28,
    tags: ["skill", "static-hold"]
  }
];

export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: "template-1",
    userId: "demo-user",
    title: "Athletic Upper Strength",
    discipline: "gym",
    description: "Push-pull upper body session with crisp strength work and accessories.",
    warmup: ["5 min assault bike", "band pull-aparts", "scap push-ups"],
    cooldown: ["Lat stretch", "pec stretch", "box breathing"],
    estimatedDurationMinutes: 70,
    favorite: true,
    exercises: [
      {
        exerciseId: "barbell-bench-press",
        exerciseName: "Barbell Bench Press",
        sets: 5,
        reps: "5",
        weight: "92.5 kg",
        restSeconds: 150
      },
      {
        exerciseId: "barbell-row",
        exerciseName: "Barbell Row",
        sets: 4,
        reps: "8",
        weight: "70 kg",
        restSeconds: 90
      }
    ]
  }
];

export const workoutSessions: WorkoutSession[] = [
  {
    id: "session-1",
    userId: "demo-user",
    templateId: "template-1",
    discipline: "gym",
    title: "Athletic Upper Strength",
    startedAt: "2026-04-20T17:30:00.000Z",
    endedAt: "2026-04-20T18:40:00.000Z",
    durationMinutes: 70,
    volumeKg: 10860,
    personalRecords: ["Bench top set matched 5RM"],
    notes: "Good energy after extra sleep.",
    exercises: [
      {
        exerciseId: "barbell-bench-press",
        exerciseName: "Barbell Bench Press",
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
  }
];

export const runningSessions: RunningSession[] = [
  {
    id: "run-1",
    userId: "demo-user",
    type: "outdoor-run",
    title: "Thursday Tempo",
    distanceKm: 6.4,
    durationMinutes: 34,
    pace: "5:19 /km",
    splits: ["5:28", "5:21", "5:18", "5:15", "5:10"],
    gpsReady: true,
    notes: "Strong finish",
    createdAt: "2026-04-20T06:45:00.000Z"
  }
];

export const mmaSessions: MMASession[] = [
  {
    id: "mma-1",
    userId: "demo-user",
    title: "Pad Work Engine",
    mode: "pad-work",
    rounds: 8,
    roundLengthSeconds: 180,
    restSeconds: 45,
    intensity: 8,
    skillTags: ["jab-cross-low-kick", "exit-angle", "defense"],
    coachNotes: "Sharper exits after the right hand.",
    createdAt: "2026-04-19T19:00:00.000Z"
  }
];

export const recoveryLogs: RecoveryLog[] = [
  {
    id: "recovery-1",
    userId: "demo-user",
    sleepHours: 8.2,
    mood: 8,
    soreness: 4,
    energy: 8,
    readinessScore: 82,
    stretchingMinutes: 18,
    notes: "Low resting heart rate this morning.",
    createdAt: "2026-04-21T05:40:00.000Z"
  },
  {
    id: "recovery-2",
    userId: "demo-user",
    sleepHours: 6.7,
    mood: 6,
    soreness: 6,
    energy: 6,
    readinessScore: 67,
    stretchingMinutes: 12,
    notes: "Travel day.",
    createdAt: "2026-04-20T05:40:00.000Z"
  }
];

export const calisthenicsProgress: CalisthenicsProgress[] = [
  {
    id: "cal-1",
    userId: "demo-user",
    skill: "muscle-up",
    currentLevel: "Band-assisted doubles",
    targetLevel: "Strict single rep",
    bestMetric: "2 clean assisted reps",
    notes: "Transition timing improved on rings.",
    updatedAt: "2026-04-20T16:10:00.000Z"
  },
  {
    id: "cal-2",
    userId: "demo-user",
    skill: "handstand",
    currentLevel: "30-second wall hold",
    targetLevel: "10-second freestanding hold",
    bestMetric: "26 seconds chest-to-wall",
    updatedAt: "2026-04-19T16:10:00.000Z"
  }
];

export const analyticsOverview: AnalyticsOverview = {
  weeklyVolume: 23310,
  weeklySessions: 5,
  weeklyDistanceKm: 16.6,
  readinessTrend: [62, 71, 68, 77, 82],
  weightTrend: [83.4, 82.9, 82.2, 81.8],
  streak: 9,
  prs: ["Paused squat volume PR", "Bench top set matched 5RM"]
};

export const activityHeatmap = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 0.7 },
  { label: "Wed", value: 0.9 },
  { label: "Thu", value: 1 },
  { label: "Fri", value: 0.6 },
  { label: "Sat", value: 0.85 },
  { label: "Sun", value: 0.4 }
];
