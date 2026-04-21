import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getWorkoutTemplates } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useCountdown } from "../../hooks/useCountdown";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function LiveWorkoutScreen() {
  const { data } = useQuery({
    queryKey: ["live-workout"],
    queryFn: getWorkoutTemplates
  });
  const template = useMemo(() => data?.[0], [data]);
  const [completedSets, setCompletedSets] = useState(0);
  const timer = useCountdown(90);
  const pushToast = useToastStore((state) => state.push);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Live Session"
        title={template?.title ?? "Session builder"}
        subtitle="Start a session, tick off sets, log load, run a rest timer, and capture session notes."
      />
      <Card glow>
        <Text style={styles.timerLabel}>Rest timer</Text>
        <Text style={styles.timerValue}>{Math.floor(timer.remaining / 60)}:{String(timer.remaining % 60).padStart(2, "0")}</Text>
        <View style={styles.row}>
          <Button label={timer.running ? "Pause" : "Start"} onPress={timer.running ? timer.pause : timer.start} style={styles.flex} />
          <Button label="Reset" onPress={() => timer.reset()} variant="secondary" style={styles.flex} />
        </View>
      </Card>
      {template?.exercises.map((exercise) => (
        <Card key={exercise.exerciseId}>
          <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
          <Text style={styles.copy}>
            {exercise.sets} sets | {exercise.reps} reps | {exercise.weight ?? "bodyweight"}
          </Text>
          <Button
            label="Mark next set complete"
            onPress={() => {
              setCompletedSets((value) => value + 1);
              timer.reset(exercise.restSeconds);
              timer.start();
            }}
            variant="secondary"
          />
        </Card>
      ))}
      <Card>
        <Text style={styles.exerciseName}>Completed sets</Text>
        <Text style={styles.copy}>{completedSets}</Text>
      </Card>
      <Button label="End workout" onPress={() => pushToast({ title: "Workout summary placeholder", tone: "success" })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  timerLabel: {
    color: colors.textMuted,
    fontSize: typography.small,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  timerValue: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flex: {
    flex: 1
  },
  exerciseName: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body
  }
});
