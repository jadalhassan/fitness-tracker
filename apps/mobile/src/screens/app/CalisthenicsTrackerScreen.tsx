import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text } from "react-native";
import { getCalisthenicsProgress } from "../../api/fitness";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useToastStore } from "../../store/toast-store";
import { colors, typography } from "../../theme";

export function CalisthenicsTrackerScreen() {
  const { data } = useQuery({
    queryKey: ["calisthenics"],
    queryFn: getCalisthenicsProgress
  });
  const pushToast = useToastStore((state) => state.push);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Calisthenics"
        title="Track skills, holds, and progression steps."
        subtitle="Pull-ups, dips, muscle-ups, handstands, levers, planche, core holds, and mobility are all represented."
      />
      {data?.map((item) => (
        <Card key={item.id}>
          <Text style={styles.title}>{item.skill}</Text>
          <Text style={styles.copy}>Current: {item.currentLevel}</Text>
          <Text style={styles.copy}>Target: {item.targetLevel}</Text>
          <Text style={styles.copy}>Best metric: {item.bestMetric}</Text>
        </Card>
      ))}
      <Button label="Update progression placeholder" onPress={() => pushToast({ title: "Progress updated placeholder", tone: "success" })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  copy: {
    color: colors.textMuted,
    lineHeight: 22
  }
});
