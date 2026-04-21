import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getExercises } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function WorkoutBuilderScreen() {
  const [title, setTitle] = useState("Upper Power + Pull");
  const { data } = useQuery({
    queryKey: ["builder-exercises"],
    queryFn: getExercises
  });
  const pushToast = useToastStore((state) => state.push);
  const picks = useMemo(() => (data ?? []).slice(0, 5), [data]);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Workout Builder"
        title="Create a touch-first template."
        subtitle="Warm-up, cooldown, sets, reps, notes, favorites, and duplication are all represented here."
      />
      <Input label="Template title" value={title} onChangeText={setTitle} />
      <Card>
        <Text style={styles.sectionTitle}>Included exercises</Text>
        {picks.map((exercise, index) => (
          <View key={exercise.id} style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.exerciseName}>{index + 1}. {exercise.name}</Text>
              <Text style={styles.copy}>4 sets | 8 reps | 90 sec rest</Text>
            </View>
            <Pressable onPress={() => pushToast({ title: `Reorder ${exercise.name} placeholder` })}>
              <Text style={styles.action}>Edit</Text>
            </Pressable>
          </View>
        ))}
      </Card>
      <Button label="Save template" onPress={() => pushToast({ title: "Template saved placeholder", tone: "success" })} />
      <Button label="Duplicate template" onPress={() => pushToast({ title: "Template duplicated placeholder" })} variant="secondary" />
      <Button label="Favorite workout" onPress={() => pushToast({ title: "Workout favorited" })} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  flex: {
    flex: 1
  },
  exerciseName: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    lineHeight: 20
  },
  action: {
    color: colors.accent,
    fontWeight: "700"
  }
});
