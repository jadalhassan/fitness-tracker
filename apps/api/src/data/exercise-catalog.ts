import type { Difficulty, Discipline, Exercise } from "@athletica/shared";

type ExerciseGroup = {
  category: string;
  discipline: Discipline;
  muscleGroups: string[];
  equipment: string[];
  names: string[];
  difficulty: Difficulty;
  progressionLevel: string;
  restGuidance: string;
  tags: string[];
  tips: string[];
  commonMistakes: string[];
  instructionCue: string;
  caloriesBase: number;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildGroup(group: ExerciseGroup): Exercise[] {
  return group.names.map((name, index) => ({
    id: slugify(name),
    name,
    category: group.category,
    discipline: group.discipline,
    muscleGroups: group.muscleGroups,
    equipment: group.equipment,
    difficulty: group.difficulty,
    instructions: [
      `Set up with a stable starting position for ${name}.`,
      `${group.instructionCue} while maintaining smooth tempo and control.`,
      "Finish each rep with full-body tension and intentional breathing."
    ],
    tips: group.tips,
    commonMistakes: group.commonMistakes,
    progressionLevel: group.progressionLevel,
    restGuidance: group.restGuidance,
    estimatedCalories: group.caloriesBase + (index % 4) * 5,
    tags: [...group.tags, group.category, group.discipline]
  }));
}

const gymGroups: ExerciseGroup[] = [
  {
    category: "chest",
    discipline: "bodybuilding",
    muscleGroups: ["chest", "triceps", "front delts"],
    equipment: ["barbell", "dumbbells", "bench"],
    names: [
      "Barbell Bench Press",
      "Incline Barbell Bench Press",
      "Incline Dumbbell Press",
      "Flat Dumbbell Press",
      "Machine Chest Press",
      "Decline Bench Press",
      "Weighted Push-Up",
      "Chest Dip",
      "Cable Fly",
      "Low To High Cable Fly",
      "Pec Deck Fly",
      "Hex Press"
    ],
    difficulty: "intermediate",
    progressionLevel: "Base pressing strength",
    restGuidance: "Rest 75-120 seconds between hard working sets.",
    tags: ["hypertrophy", "push-day", "upper-body"],
    tips: [
      "Keep shoulder blades pinned back to create a stable pressing base.",
      "Drive through the mid-foot when using heavier loads."
    ],
    commonMistakes: [
      "Bouncing the bar off the chest.",
      "Letting elbows flare too early."
    ],
    instructionCue: "Lower with control, press explosively",
    caloriesBase: 42
  },
  {
    category: "back",
    discipline: "bodybuilding",
    muscleGroups: ["lats", "mid-back", "rear delts"],
    equipment: ["barbell", "cable", "pull-up bar"],
    names: [
      "Pull-Up",
      "Chin-Up",
      "Barbell Row",
      "Pendlay Row",
      "T-Bar Row",
      "Seated Cable Row",
      "Lat Pulldown",
      "Chest Supported Row",
      "Single-Arm Dumbbell Row",
      "Straight-Arm Pulldown",
      "Meadows Row",
      "Face Pull"
    ],
    difficulty: "intermediate",
    progressionLevel: "Vertical and horizontal pulling capacity",
    restGuidance: "Rest 60-120 seconds and reset posture before each set.",
    tags: ["pull-day", "hypertrophy", "posture"],
    tips: [
      "Lead with the elbow and finish each rep with a deliberate squeeze.",
      "Keep the rib cage stacked so the lower back does not take over."
    ],
    commonMistakes: [
      "Using momentum instead of back tension.",
      "Shrugging shoulders toward the ears."
    ],
    instructionCue: "Pull toward the torso, pause briefly, and resist the eccentric",
    caloriesBase: 40
  },
  {
    category: "legs",
    discipline: "gym",
    muscleGroups: ["quads", "glutes", "hamstrings"],
    equipment: ["barbell", "machine", "dumbbells"],
    names: [
      "Back Squat",
      "Front Squat",
      "Goblet Squat",
      "Bulgarian Split Squat",
      "Walking Lunge",
      "Leg Press",
      "Hack Squat",
      "Romanian Deadlift",
      "Stiff-Leg Deadlift",
      "Hip Thrust",
      "Leg Extension",
      "Lying Leg Curl",
      "Standing Calf Raise",
      "Seated Calf Raise",
      "Step-Up"
    ],
    difficulty: "intermediate",
    progressionLevel: "Foundational lower-body strength",
    restGuidance: "Rest 90-150 seconds on compound sets and 45-60 on accessories.",
    tags: ["leg-day", "strength", "hypertrophy"],
    tips: [
      "Brace before the eccentric and stay rooted through the whole foot.",
      "Match load selection to the deepest pain-free range of motion."
    ],
    commonMistakes: [
      "Rushing the eccentric and losing balance.",
      "Cutting depth short when mobility allows more."
    ],
    instructionCue: "Sit into the pattern with bracing and drive up through the floor",
    caloriesBase: 48
  },
  {
    category: "shoulders",
    discipline: "bodybuilding",
    muscleGroups: ["delts", "traps", "upper chest"],
    equipment: ["barbell", "dumbbells", "cable"],
    names: [
      "Standing Overhead Press",
      "Seated Dumbbell Press",
      "Arnold Press",
      "Lateral Raise",
      "Cable Lateral Raise",
      "Machine Shoulder Press",
      "Rear Delt Fly",
      "Front Raise",
      "Upright Row",
      "Push Press"
    ],
    difficulty: "intermediate",
    progressionLevel: "Deltoid strength and shape",
    restGuidance: "Rest 60-90 seconds for isolation work and 120 for presses.",
    tags: ["upper-body", "shape", "stability"],
    tips: [
      "Keep ribs down so the shoulders move without lumbar overextension.",
      "Use slight pauses at the top to own the range."
    ],
    commonMistakes: [
      "Swinging the dumbbells up with the torso.",
      "Turning isolation work into shrugs."
    ],
    instructionCue: "Press or raise through a smooth arc while staying tall",
    caloriesBase: 36
  },
  {
    category: "arms",
    discipline: "bodybuilding",
    muscleGroups: ["biceps", "triceps", "forearms"],
    equipment: ["barbell", "dumbbells", "cable"],
    names: [
      "Barbell Curl",
      "EZ-Bar Curl",
      "Incline Dumbbell Curl",
      "Hammer Curl",
      "Cable Curl",
      "Preacher Curl",
      "Reverse Curl",
      "Skull Crusher",
      "Rope Pushdown",
      "Overhead Triceps Extension",
      "Close-Grip Bench Press",
      "Bench Dip"
    ],
    difficulty: "beginner",
    progressionLevel: "Arm hypertrophy capacity",
    restGuidance: "Rest 45-75 seconds and chase clean pump-focused execution.",
    tags: ["accessories", "pump", "upper-body"],
    tips: [
      "Keep elbows mostly fixed to bias the intended muscle group.",
      "Use controlled eccentrics to build quality tension."
    ],
    commonMistakes: [
      "Rocking the torso to finish reps.",
      "Shortening the range just to use more weight."
    ],
    instructionCue: "Move through full range while keeping the elbow path consistent",
    caloriesBase: 28
  },
  {
    category: "core",
    discipline: "gym",
    muscleGroups: ["abs", "obliques", "deep core"],
    equipment: ["bodyweight", "cable", "ab wheel"],
    names: [
      "Plank",
      "Side Plank",
      "Dead Bug",
      "Hanging Knee Raise",
      "Hanging Leg Raise",
      "Ab Wheel Rollout",
      "Cable Crunch",
      "Pallof Press",
      "Decline Sit-Up",
      "Russian Twist"
    ],
    difficulty: "beginner",
    progressionLevel: "Bracing and trunk control",
    restGuidance: "Rest 30-60 seconds and stay focused on crisp positioning.",
    tags: ["bracing", "midline", "injury-prevention"],
    tips: [
      "Exhale fully to feel the trunk lock in.",
      "Choose the hardest variation you can own without spinal compensation."
    ],
    commonMistakes: [
      "Letting the lower back sag under fatigue.",
      "Turning anti-rotation drills into shoulder work."
    ],
    instructionCue: "Brace, breathe with control, and keep the rib cage stacked",
    caloriesBase: 24
  },
  {
    category: "full body",
    discipline: "hiit",
    muscleGroups: ["full body", "posterior chain", "core"],
    equipment: ["barbell", "kettlebell", "sled"],
    names: [
      "Thruster",
      "Kettlebell Swing",
      "Power Clean",
      "Hang Power Snatch",
      "Farmer Carry",
      "Sled Push",
      "Battle Rope Slams",
      "Medicine Ball Slam",
      "Burpee Broad Jump",
      "Rowing Sprint"
    ],
    difficulty: "advanced",
    progressionLevel: "Athletic power and work capacity",
    restGuidance: "Rest 60-180 seconds based on output quality and heart rate recovery.",
    tags: ["conditioning", "power", "athletic"],
    tips: [
      "Stay sharp and explosive rather than chasing sloppy fatigue.",
      "End sets when mechanics drop off."
    ],
    commonMistakes: [
      "Turning power work into slow grinding reps.",
      "Ignoring breathing cadence during intervals."
    ],
    instructionCue: "Explode through each rep and recover enough to repeat with quality",
    caloriesBase: 55
  },
  {
    category: "powerlifting",
    discipline: "powerlifting",
    muscleGroups: ["chest", "back", "legs"],
    equipment: ["barbell", "rack", "platform"],
    names: [
      "Competition Bench Press",
      "Paused Bench Press",
      "Larsen Press",
      "Low-Bar Back Squat",
      "Pause Squat",
      "Tempo Squat",
      "Conventional Deadlift",
      "Sumo Deadlift",
      "Deficit Deadlift",
      "Rack Pull",
      "Block Pull",
      "Good Morning"
    ],
    difficulty: "advanced",
    progressionLevel: "Meet-style strength expression",
    restGuidance: "Rest 2-4 minutes between top sets to preserve bar speed.",
    tags: ["strength", "competition", "max-effort"],
    tips: [
      "Treat setup the same way every time to build reliable skill.",
      "Use bar speed and technique quality to autoregulate."
    ],
    commonMistakes: [
      "Overshooting load before positions are locked in.",
      "Skipping pauses on pause-specific variations."
    ],
    instructionCue: "Create full-body tension before the first inch of the lift",
    caloriesBase: 50
  },
  {
    category: "plyometrics",
    discipline: "hiit",
    muscleGroups: ["legs", "core", "ankles"],
    equipment: ["box", "cones", "bodyweight"],
    names: [
      "Box Jump",
      "Depth Jump",
      "Broad Jump",
      "Skater Hop",
      "Split Squat Jump",
      "Tuck Jump",
      "Trap Bar Jump",
      "Lateral Bound",
      "Sprint Start",
      "Agility Ladder High Knees",
      "Cone Shuffle",
      "Medicine Ball Chest Throw"
    ],
    difficulty: "intermediate",
    progressionLevel: "Reactive athleticism",
    restGuidance: "Rest 60-120 seconds and stop sets before contacts get noisy.",
    tags: ["speed", "agility", "explosive"],
    tips: [
      "Keep landings quiet and organized.",
      "Use full intent on every rep rather than mindless volume."
    ],
    commonMistakes: [
      "Letting contact times drift long.",
      "Adding fatigue that kills the purpose of power work."
    ],
    instructionCue: "Attack the ground and absorb force with stacked joints",
    caloriesBase: 38
  }
];

const calisthenicsGroups: ExerciseGroup[] = [
  {
    category: "bodyweight skills",
    discipline: "calisthenics",
    muscleGroups: ["back", "arms", "core"],
    equipment: ["pull-up bar", "rings", "bodyweight"],
    names: [
      "Strict Pull-Up",
      "Chin-Up",
      "Australian Row",
      "Ring Row",
      "Push-Up",
      "Archer Push-Up",
      "Pike Push-Up",
      "Dip",
      "Ring Dip",
      "Toes-To-Bar",
      "L-Sit Hold",
      "V-Sit Compression Drill",
      "Tuck Planche Hold",
      "Planche Lean",
      "Crow Stand",
      "Wall Handstand Hold",
      "Handstand Kick-Up Drill",
      "Freestanding Handstand Practice",
      "Band-Assisted Muscle-Up",
      "Muscle-Up Transition Drill",
      "Front Lever Tuck Hold",
      "Front Lever Raise",
      "Back Lever Skin The Cat",
      "Hollow Body Hold",
      "Dragon Flag",
      "Human Flag Progression",
      "Nordic Curl",
      "Shrimp Squat",
      "Cossack Squat",
      "Jefferson Curl"
    ],
    difficulty: "intermediate",
    progressionLevel: "Skill ladder with strength emphasis",
    restGuidance: "Rest 60-150 seconds and preserve quality body lines.",
    tags: ["skill", "bodyweight", "control"],
    tips: [
      "Own the easiest clean progression before leveling up.",
      "Use video review to reinforce body position."
    ],
    commonMistakes: [
      "Jumping to advanced variations too early.",
      "Losing hollow-body tension under fatigue."
    ],
    instructionCue: "Move with long body lines and pause in the hardest position",
    caloriesBase: 32
  }
];

const combatGroups: ExerciseGroup[] = [
  {
    category: "boxing",
    discipline: "boxing",
    muscleGroups: ["shoulders", "core", "legs"],
    equipment: ["heavy bag", "gloves", "wraps"],
    names: [
      "Heavy Bag Power Round",
      "Heavy Bag Volume Round",
      "Pad Work Combo Flow",
      "Shadow Boxing Footwork",
      "Slip Line Defense",
      "Double-End Bag Timing",
      "Speed Bag Rhythm",
      "Jump Rope Fight Rhythm"
    ],
    difficulty: "intermediate",
    progressionLevel: "Striking rhythm and conditioning",
    restGuidance: "Work in 2-5 minute rounds with 30-60 seconds rest.",
    tags: ["striking", "conditioning", "timing"],
    tips: [
      "Stay relaxed between combinations so speed can show up.",
      "Finish exchanges balanced and ready to move."
    ],
    commonMistakes: [
      "Overcommitting the shoulders and losing snap.",
      "Standing flat-footed after every combo."
    ],
    instructionCue: "Keep the stance alive, rotate through the hips, and reset cleanly",
    caloriesBase: 50
  },
  {
    category: "wrestling",
    discipline: "wrestling",
    muscleGroups: ["legs", "back", "core"],
    equipment: ["mat", "bodyweight", "wall"],
    names: [
      "Penetration Step Reps",
      "Single-Leg Finish Chain",
      "Double-Leg Drive",
      "Wall Walk Wrestling",
      "Cage Pummeling",
      "Sprawl To Jab Reset",
      "Clinch Knees Drill",
      "Turtle Sit-Out Drill"
    ],
    difficulty: "intermediate",
    progressionLevel: "Takedown mechanics and hand fighting",
    restGuidance: "Keep rounds crisp with 45-75 seconds rest between efforts.",
    tags: ["grappling", "scramble", "conditioning"],
    tips: [
      "Keep head position honest and knees under you during transitions.",
      "Drill entries at game speed only after positions feel clean."
    ],
    commonMistakes: [
      "Reaching with the upper body instead of stepping in.",
      "Letting posture collapse on finishes."
    ],
    instructionCue: "Change levels decisively and drive through the finish",
    caloriesBase: 54
  },
  {
    category: "BJJ solo drills",
    discipline: "bjj",
    muscleGroups: ["core", "hips", "shoulders"],
    equipment: ["mat", "bodyweight"],
    names: [
      "Granby Roll Escape",
      "Hip Heist Technical Stand-Up",
      "Shrimp And Bridge Flow",
      "BJJ Solo Guard Recovery",
      "Technical Stand-Up Reps",
      "Armbar Hip Lift Drill",
      "Triangle Entry Drill",
      "Ground And Pound Burst",
      "Aerobic Assault Bike Fight Pace"
    ],
    difficulty: "beginner",
    progressionLevel: "Solo mat fluency and fight conditioning",
    restGuidance: "Use short sets and focus on precision before speed.",
    tags: ["grappling", "solo-drill", "movement"],
    tips: [
      "Build smooth sequences before adding pace.",
      "Treat every rep like a live positional rehearsal."
    ],
    commonMistakes: [
      "Skipping hip extension on escapes.",
      "Rushing transitions and losing structure."
    ],
    instructionCue: "Move from the hips first and connect each drill into a flow",
    caloriesBase: 44
  }
];

const runningGroups: ExerciseGroup[] = [
  {
    category: "running",
    discipline: "running",
    muscleGroups: ["calves", "glutes", "cardio"],
    equipment: ["shoes", "track", "treadmill"],
    names: [
      "Easy Run",
      "Tempo Run",
      "Interval 400m Repeats",
      "Interval 800m Repeats",
      "Long Slow Distance Run",
      "Fartlek Session",
      "Hill Sprints",
      "Recovery Jog",
      "Treadmill Incline Walk",
      "Treadmill Tempo",
      "Negative Split Run",
      "Track Ladder",
      "Progression Run",
      "Threshold Cruise Intervals",
      "VO2 Max Repeats",
      "Strides Session",
      "Ruck Walk",
      "Endurance Walk",
      "Speed Endurance Circuit",
      "Trail Run"
    ],
    difficulty: "beginner",
    progressionLevel: "Aerobic base through race-pace development",
    restGuidance: "Respect easy days so the hard sessions can stay sharp.",
    tags: ["cardio", "engine", "outdoors"],
    tips: [
      "Match the day to the goal instead of running every session too hard.",
      "Track pace alongside perceived effort."
    ],
    commonMistakes: [
      "Starting every run too fast.",
      "Ignoring cooldown and post-run mobility."
    ],
    instructionCue: "Set rhythm early, relax the upper body, and hold posture late",
    caloriesBase: 58
  }
];

const recoveryGroups: ExerciseGroup[] = [
  {
    category: "recovery",
    discipline: "recovery",
    muscleGroups: ["full body", "breathing", "mobility"],
    equipment: ["foam roller", "band", "bodyweight"],
    names: [
      "Full Body Stretch Flow",
      "Hip Mobility Flow",
      "Thoracic Rotation Drill",
      "Ankle Mobility Series",
      "Hamstring Floss",
      "Couch Stretch",
      "Box Breathing Reset",
      "Parasympathetic Cooldown Walk",
      "Foam Roll Quads",
      "Foam Roll Lats",
      "Glute Release",
      "Neck Mobility Reset",
      "Wrist Prep Series",
      "Lower Back Decompression",
      "Breath-Led Mobility Flow",
      "Recovery Bike Spin",
      "Sauna Recovery Placeholder",
      "Contrast Shower Placeholder",
      "Sleep Winddown Routine",
      "Meditation Scan"
    ],
    difficulty: "beginner",
    progressionLevel: "Consistency and body awareness",
    restGuidance: "Keep intensity low and leave the body feeling fresher than it started.",
    tags: ["mobility", "sleep", "reset"],
    tips: [
      "Breathe slowly enough that the nervous system actually downshifts.",
      "Spend extra time where you are chronically stiff."
    ],
    commonMistakes: [
      "Turning recovery work into another hard session.",
      "Rushing through positions without settling."
    ],
    instructionCue: "Use slow breathing and long positions to restore range and calm",
    caloriesBase: 18
  }
];

export const exerciseCatalog = [
  ...gymGroups.flatMap(buildGroup),
  ...calisthenicsGroups.flatMap(buildGroup),
  ...combatGroups.flatMap(buildGroup),
  ...runningGroups.flatMap(buildGroup),
  ...recoveryGroups.flatMap(buildGroup)
];

export const exerciseCatalogStats = {
  total: exerciseCatalog.length,
  gymCount: gymGroups.flatMap((group) => group.names).length,
  calisthenicsCount: calisthenicsGroups.flatMap((group) => group.names).length,
  combatCount: combatGroups.flatMap((group) => group.names).length,
  runningCount: runningGroups.flatMap((group) => group.names).length,
  recoveryCount: recoveryGroups.flatMap((group) => group.names).length
};
