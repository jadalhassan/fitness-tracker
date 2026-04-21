import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { getRunningSessions } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useToastStore } from "../../store/toast-store";
import { colors, typography } from "../../theme";

export function RunningTrackerScreen() {
  const { data } = useQuery({
    queryKey: ["running"],
    queryFn: getRunningSessions
  });
  const [distance, setDistance] = useState("5.0");
  const [duration, setDuration] = useState("28");
  const pushToast = useToastStore((state) => state.push);

  const pace = useMemo(() => {
    const km = Number(distance);
    const minutes = Number(duration);
    if (!km || !minutes) {
      return "--";
    }
    const paceValue = minutes / km;
    const mins = Math.floor(paceValue);
    const secs = Math.round((paceValue - mins) * 60);
    return `${mins}:${String(secs).padStart(2, "0")} /km`;
  }, [distance, duration]);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Running"
        title="Outdoor, indoor, intervals, and long-run logging."
        subtitle="Distance, time, pace, split placeholders, and GPS-ready architecture are already shaped into the screen."
      />
      <Input label="Distance (km)" value={distance} onChangeText={setDistance} keyboardType="numeric" />
      <Input label="Duration (minutes)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Card glow>
        <Text style={styles.label}>Projected pace</Text>
        <Text style={styles.value}>{pace}</Text>
      </Card>
      <Button label="Save run placeholder" onPress={() => pushToast({ title: "Run logged placeholder", tone: "success" })} />
      {data?.map((session) => (
        <Card key={session.id}>
          <Text style={styles.itemTitle}>{session.title}</Text>
          <Text style={styles.itemCopy}>
            {session.distanceKm} km | {session.durationMinutes} min | {session.pace}
          </Text>
        </Card>
      ))}
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
    fontSize: 34,
    fontWeight: "800"
  },
  itemTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  itemCopy: {
    color: colors.textMuted,
    lineHeight: 22
  }
});
