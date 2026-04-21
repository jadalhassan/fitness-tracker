import { StyleSheet, Text } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { suggestedPlan } from "../../data/demo-data";
import { useAuthStore } from "../../store/auth-store";
import { useOnboardingStore } from "../../store/onboarding-store";
import { colors, typography } from "../../theme";

export function PlanSuggestionScreen() {
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const updateUser = useAuthStore((state) => state.updateUser);
  const user = useAuthStore((state) => state.user);
  const onboarding = useOnboardingStore();

  function handleFinish() {
    if (user) {
      updateUser({
        ...user,
        goals: onboarding.goals.map((goal, index) => ({
          id: `goal-${index}`,
          type: goal,
          title: "Primary focus",
          target: suggestedPlan.title
        })),
        profile: {
          ...user.profile,
          age: Number(onboarding.age),
          heightCm: Number(onboarding.heightCm),
          weightKg: Number(onboarding.weightKg),
          weeklyFrequency: onboarding.weeklyFrequency,
          fitnessLevel: onboarding.fitnessLevel,
          preferredDisciplines: onboarding.disciplines,
          equipmentAvailability: onboarding.equipment
        }
      });
    }

    completeOnboarding();
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Starter plan"
        title={suggestedPlan.title}
        subtitle={suggestedPlan.summary}
      />
      <Card glow>
        <Text style={styles.label}>Plan length</Text>
        <Text style={styles.value}>{suggestedPlan.durationWeeks} weeks</Text>
        <Text style={styles.copy}>
          Emphasis on {suggestedPlan.focus.join(", ")} with recovery guardrails and progressive weekly targets.
        </Text>
      </Card>
      <Button label="Finish setup" onPress={handleFinish} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textMuted,
    fontSize: typography.small,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  value: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  }
});
