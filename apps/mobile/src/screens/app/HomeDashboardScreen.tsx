import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getDashboardBundle } from "../../api/fitness";
import { Card } from "../../components/ui/Card";
import { LoadingBlock } from "../../components/ui/LoadingBlock";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { StatTile } from "../../components/ui/StatTile";
import type { RootStackParamList } from "../../navigation/types";
import { colors, spacing, typography } from "../../theme";

export function HomeDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardBundle
  });

  if (isLoading || !data) {
    return (
      <Screen>
        <LoadingBlock height={180} />
        <LoadingBlock />
        <LoadingBlock />
      </Screen>
    );
  }

  const nextTemplate = data.templates[0];
  const latestRecovery = data.recovery[0];
  const latestSession = data.sessions[0];

  return (
    <Screen>
      <SectionHeader
        eyebrow="Today"
        title={`Welcome back, ${data.profile.firstName}`}
        subtitle="Your daily summary, recovery snapshot, and sharpest next action are all in one place."
      />

      <Card glow>
        <Text style={styles.heroValue}>{data.overview.streak} day streak</Text>
        <Text style={styles.heroText}>
          Next up: {nextTemplate?.title ?? "Create a workout"} and keep the momentum clean.
        </Text>
        <View style={styles.ctaRow}>
          <Pressable style={styles.ctaButton} onPress={() => navigation.navigate("LiveWorkout")}>
            <Text style={styles.ctaLabel}>Start workout</Text>
          </Pressable>
          <Pressable style={[styles.ctaButton, styles.ctaSecondary]} onPress={() => navigation.navigate("RunningTracker")}>
            <Text style={styles.ctaSecondaryLabel}>Log a run</Text>
          </Pressable>
        </View>
      </Card>

      <View style={styles.statsGrid}>
        <View style={styles.half}><StatTile label="Weekly volume" value={`${data.overview.weeklyVolume.toLocaleString()} kg`} /></View>
        <View style={styles.half}><StatTile label="Weekly distance" value={`${data.overview.weeklyDistanceKm} km`} /></View>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.half}><StatTile label="Sessions" value={`${data.overview.weeklySessions}`} hint="This week" /></View>
        <View style={styles.half}><StatTile label="Recovery" value={`${latestRecovery?.readinessScore ?? 0}`} hint="Readiness score" /></View>
      </View>

      <Card>
        <Text style={styles.cardTitle}>Today's workout</Text>
        <Text style={styles.cardHeadline}>{nextTemplate?.title ?? "No template selected yet"}</Text>
        <Text style={styles.cardCopy}>{nextTemplate?.description ?? "Build a session and save it as a template."}</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Recovery snapshot</Text>
        <Text style={styles.cardHeadline}>
          {latestRecovery?.sleepHours ?? "--"}h sleep | soreness {latestRecovery?.soreness ?? "--"}/10
        </Text>
        <Text style={styles.cardCopy}>{latestRecovery?.notes ?? "Log recovery to unlock readiness suggestions."}</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Recent session</Text>
        <Text style={styles.cardHeadline}>{latestSession?.title ?? "No recent session"}</Text>
        <Text style={styles.cardCopy}>{latestSession?.personalRecords.join(" | ") || "Your next PR is waiting."}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroValue: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800"
  },
  heroText: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  },
  ctaRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  ctaButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center"
  },
  ctaSecondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border
  },
  ctaLabel: {
    color: colors.background,
    fontWeight: "700"
  },
  ctaSecondaryLabel: {
    color: colors.text,
    fontWeight: "700"
  },
  statsGrid: {
    flexDirection: "row",
    gap: spacing.sm
  },
  half: {
    flex: 1
  },
  cardTitle: {
    color: colors.textMuted,
    fontSize: typography.small,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  cardHeadline: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  cardCopy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  }
});
