import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getRecoveryLogs } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function RecoveryTrackerScreen() {
  const { data } = useQuery({
    queryKey: ["recovery"],
    queryFn: getRecoveryLogs
  });
  const [sleepHours] = useState(8.0);
  const [energy] = useState(8);
  const [soreness] = useState(4);
  const pushToast = useToastStore((state) => state.push);

  const readiness = useMemo(() => Math.round(sleepHours * 8 + energy * 5 - soreness * 2), [energy, sleepHours, soreness]);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Recovery"
        title="Sleep, soreness, mood, and readiness."
        subtitle="A premium recovery log that stays lightweight enough to use daily."
      />
      <Card glow>
        <Text style={styles.metric}>{readiness}</Text>
        <Text style={styles.copy}>Readiness preview based on today's check-in.</Text>
      </Card>
      <Button label="Save recovery log placeholder" onPress={() => pushToast({ title: "Recovery saved placeholder", tone: "success" })} />
      {data?.map((log) => (
        <Card key={log.id}>
          <Text style={styles.title}>{log.sleepHours}h sleep | energy {log.energy}/10</Text>
          <Text style={styles.copy}>Soreness {log.soreness}/10 | readiness {log.readinessScore}</Text>
          <Text style={styles.copy}>{log.notes}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  metric: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "800"
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    lineHeight: 22
  }
});
