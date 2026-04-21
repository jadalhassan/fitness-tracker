import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { getExercises } from "../../api/fitness";
import { EmptyState } from "../../components/ui/EmptyState";
import { LoadingBlock } from "../../components/ui/LoadingBlock";
import { Pill } from "../../components/ui/Pill";
import { Screen } from "../../components/ui/Screen";
import type { RootStackParamList } from "../../navigation/types";
import { colors, radius, spacing, typography } from "../../theme";

export function ExerciseBrowserScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises
  });

  const filtered = useMemo(
    () =>
      (data ?? []).filter((exercise) =>
        `${exercise.name} ${exercise.category} ${exercise.discipline}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [data, search]
  );

  return (
    <Screen>
      <TextInput
        placeholder="Search exercises, skills, or categories"
        placeholderTextColor={colors.textSoft}
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      {isLoading ? (
        <>
          <LoadingBlock />
          <LoadingBlock />
        </>
      ) : filtered.length === 0 ? (
        <EmptyState title="Nothing matched" description="Try chest, running, boxing, or recovery." />
      ) : (
        <View style={styles.list}>
          {filtered.slice(0, 24).map((exercise) => (
            <Pressable
              key={exercise.id}
              onPress={() => navigation.navigate("ExerciseDetail", { exerciseId: exercise.id })}
              style={styles.card}
            >
              <Text style={styles.title}>{exercise.name}</Text>
              <Text style={styles.copy}>
                {exercise.category} | {exercise.discipline}
              </Text>
              <View style={styles.tags}>
                {exercise.tags.slice(0, 3).map((tag) => (
                  <Pill key={tag} label={tag} />
                ))}
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    fontSize: typography.body
  },
  list: {
    gap: spacing.md
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
