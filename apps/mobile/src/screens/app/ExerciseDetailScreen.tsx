import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { getExercise } from "../../api/fitness";
import { Card } from "../../components/ui/Card";
import { LoadingBlock } from "../../components/ui/LoadingBlock";
import { Pill } from "../../components/ui/Pill";
import { Screen } from "../../components/ui/Screen";
import { colors, spacing, typography } from "../../theme";

export function ExerciseDetailScreen({ route }: { route: any }) {
  const { exerciseId } = route.params;
  const { data, isLoading } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => getExercise(exerciseId)
  });

  if (isLoading || !data) {
    return (
      <Screen>
        <LoadingBlock height={220} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Card glow>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.subtitle}>
          {data.category} | {data.difficulty} | {data.discipline}
        </Text>
        <View style={styles.tags}>
          {data.muscleGroups.map((group) => (
            <Pill key={group} label={group} />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {data.instructions.map((item) => (
          <Text key={item} style={styles.line}>- {item}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Tips</Text>
        {data.tips.map((item) => (
          <Text key={item} style={styles.line}>- {item}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Common mistakes</Text>
        {data.commonMistakes.map((item) => (
          <Text key={item} style={styles.line}>- {item}</Text>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  line: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  }
});
