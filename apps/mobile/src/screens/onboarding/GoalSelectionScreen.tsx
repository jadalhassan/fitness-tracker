import type { Discipline, GoalType } from "@athletica/shared";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useOnboardingStore } from "../../store/onboarding-store";
import { colors, radius, spacing, typography } from "../../theme";

const goalOptions: { key: GoalType; label: string }[] = [
  { key: "build-muscle", label: "Build muscle" },
  { key: "lose-fat", label: "Lose fat" },
  { key: "improve-endurance", label: "Endurance" },
  { key: "boost-athleticism", label: "Athleticism" },
  { key: "master-skills", label: "Skill mastery" },
  { key: "recover-better", label: "Recovery" }
];

const disciplines: Discipline[] = [
  "gym",
  "bodybuilding",
  "running",
  "boxing",
  "wrestling",
  "bjj",
  "calisthenics",
  "recovery"
];

export function GoalSelectionScreen({ navigation }: { navigation: any }) {
  const goals = useOnboardingStore((state) => state.goals);
  const setGoals = useOnboardingStore((state) => state.setGoals);
  const selectedDisciplines = useOnboardingStore((state) => state.disciplines);
  const setDisciplines = useOnboardingStore((state) => state.setDisciplines);
  const fitnessLevel = useOnboardingStore((state) => state.fitnessLevel);
  const setFitnessLevel = useOnboardingStore((state) => state.setFitnessLevel);

  function toggleGoal(goal: GoalType) {
    setGoals(
      goals.includes(goal) ? goals.filter((item) => item !== goal) : [...goals, goal]
    );
  }

  function toggleDiscipline(discipline: Discipline) {
    setDisciplines(
      selectedDisciplines.includes(discipline)
        ? selectedDisciplines.filter((item) => item !== discipline)
        : [...selectedDisciplines, discipline]
    );
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Goals"
        title="What are we training toward?"
        subtitle="Choose the outcomes and disciplines that should shape your default plan."
      />
      <View style={styles.grid}>
        {goalOptions.map((goal) => (
          <Pressable
            key={goal.key}
            onPress={() => toggleGoal(goal.key)}
            style={[styles.choice, goals.includes(goal.key) && styles.choiceActive]}
          >
            <Text style={[styles.choiceLabel, goals.includes(goal.key) && styles.choiceLabelActive]}>
              {goal.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Preferred disciplines" subtitle="Pick the modes you want surfaced most often." />
      <View style={styles.grid}>
        {disciplines.map((discipline) => (
          <Pressable
            key={discipline}
            onPress={() => toggleDiscipline(discipline)}
            style={[
              styles.choice,
              selectedDisciplines.includes(discipline) && styles.choiceActive
            ]}
          >
            <Text
              style={[
                styles.choiceLabel,
                selectedDisciplines.includes(discipline) && styles.choiceLabelActive
              ]}
            >
              {discipline}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Current level" />
      <View style={styles.row}>
        {(["beginner", "intermediate", "advanced"] as const).map((level) => (
          <Pressable
            key={level}
            onPress={() => setFitnessLevel(level)}
            style={[styles.levelButton, fitnessLevel === level && styles.choiceActive]}
          >
            <Text style={[styles.choiceLabel, fitnessLevel === level && styles.choiceLabelActive]}>
              {level}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button label="Continue" onPress={() => navigation.navigate("ProfileSetup")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  choice: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  levelButton: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center"
  },
  choiceActive: {
    backgroundColor: "rgba(124,243,200,0.14)",
    borderColor: "rgba(124,243,200,0.4)"
  },
  choiceLabel: {
    color: colors.textMuted,
    fontSize: typography.body,
    textTransform: "capitalize"
  },
  choiceLabelActive: {
    color: colors.text,
    fontWeight: "700"
  }
});
