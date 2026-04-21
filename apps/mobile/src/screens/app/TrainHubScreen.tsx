import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import type { RootStackParamList } from "../../navigation/types";
import { colors, spacing, typography } from "../../theme";

type TrainRoute =
  | "ExerciseBrowser"
  | "WorkoutBuilder"
  | "LiveWorkout"
  | "RunningTracker"
  | "MMATracker"
  | "CalisthenicsTracker"
  | "RecoveryTracker";

const tiles: { title: string; subtitle: string; route: TrainRoute }[] = [
  { title: "Exercise Browser", subtitle: "Search strength, combat, running, and recovery movement.", route: "ExerciseBrowser" },
  { title: "Workout Builder", subtitle: "Create templates with sets, reps, rest, warm-up, and cooldown.", route: "WorkoutBuilder" },
  { title: "Live Workout", subtitle: "Track sets, adjust load, run rest timers, and catch PR moments.", route: "LiveWorkout" },
  { title: "Running Tracker", subtitle: "Log runs, intervals, pace, and GPS-ready sessions.", route: "RunningTracker" },
  { title: "MMA Tracker", subtitle: "Rounds, rest, intensity, skill tags, and coach notes.", route: "MMATracker" },
  { title: "Calisthenics", subtitle: "Progress handstands, muscle-ups, levers, planche, and holds.", route: "CalisthenicsTracker" },
  { title: "Recovery", subtitle: "Sleep, soreness, mood, energy, and readiness snapshots.", route: "RecoveryTracker" }
];

export function TrainHubScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <SectionHeader
        eyebrow="Train"
        title="Choose the session mode."
        subtitle="Everything here is optimized for touch-first flows, fast logging, and dark athletic polish."
      />
      <View style={styles.list}>
        {tiles.map((tile) => (
            <Pressable key={tile.title} onPress={() => navigation.navigate(tile.route)}>
            <Card>
              <Text style={styles.title}>{tile.title}</Text>
              <Text style={styles.copy}>{tile.subtitle}</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  }
});
