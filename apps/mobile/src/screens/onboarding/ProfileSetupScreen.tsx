import { StyleSheet, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useOnboardingStore } from "../../store/onboarding-store";
import { spacing } from "../../theme";

export function ProfileSetupScreen({ navigation }: { navigation: any }) {
  const weeklyFrequency = useOnboardingStore((state) => state.weeklyFrequency);
  const heightCm = useOnboardingStore((state) => state.heightCm);
  const weightKg = useOnboardingStore((state) => state.weightKg);
  const age = useOnboardingStore((state) => state.age);
  const setField = useOnboardingStore((state) => state.setField);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Profile"
        title="Dial in your baseline."
        subtitle="These inputs drive starter planning, readiness language, and suggested weekly flow."
      />
      <Input
        label="Weekly training frequency"
        value={String(weeklyFrequency)}
        onChangeText={(value) => setField("weeklyFrequency", Number(value || 0))}
        keyboardType="numeric"
      />
      <View style={styles.row}>
        <View style={styles.flex}>
          <Input
            label="Height (cm)"
            value={heightCm}
            onChangeText={(value) => setField("heightCm", value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.flex}>
          <Input
            label="Weight (kg)"
            value={weightKg}
            onChangeText={(value) => setField("weightKg", value)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <Input
        label="Age"
        value={age}
        onChangeText={(value) => setField("age", value)}
        keyboardType="numeric"
      />
      <Button label="See my starter plan" onPress={() => navigation.navigate("PlanSuggestion")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flex: {
    flex: 1
  }
});
