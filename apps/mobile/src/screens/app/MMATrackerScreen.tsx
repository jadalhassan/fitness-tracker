import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { getMMASessions } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useCountdown } from "../../hooks/useCountdown";
import { colors, spacing, typography } from "../../theme";

export function MMATrackerScreen() {
  const { data } = useQuery({
    queryKey: ["mma"],
    queryFn: getMMASessions
  });
  const roundTimer = useCountdown(180);
  const restTimer = useCountdown(45);

  return (
    <Screen>
      <SectionHeader
        eyebrow="MMA / Fight Tracking"
        title="Rounds, intensity, skill tags, and notes."
        subtitle="Built for bag rounds, pad work, shadow boxing, sparring, wrestling, and BJJ drill logging."
      />
      <Card glow>
        <Text style={styles.metric}>Round {Math.floor(roundTimer.remaining / 60)}:{String(roundTimer.remaining % 60).padStart(2, "0")}</Text>
        <View style={styles.row}>
          <Button label={roundTimer.running ? "Pause round" : "Start round"} onPress={roundTimer.running ? roundTimer.pause : roundTimer.start} style={styles.flex} />
          <Button label="Rest timer" onPress={restTimer.running ? restTimer.pause : restTimer.start} variant="secondary" style={styles.flex} />
        </View>
        <Text style={styles.copy}>Rest: {Math.floor(restTimer.remaining / 60)}:{String(restTimer.remaining % 60).padStart(2, "0")}</Text>
      </Card>
      {data?.map((session) => (
        <Card key={session.id}>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.copy}>
            {session.rounds} rounds | intensity {session.intensity}/10
          </Text>
          <View style={styles.tags}>
            {session.skillTags.map((tag) => (
              <Pill key={tag} label={tag} />
            ))}
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  metric: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800"
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flex: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    lineHeight: 22
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
