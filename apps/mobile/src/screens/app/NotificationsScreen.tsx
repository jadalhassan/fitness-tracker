import { StyleSheet, Text } from "react-native";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors, typography } from "../../theme";

export function NotificationsScreen() {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Notifications"
        title="Reminder stack"
        subtitle="Workout, running, recovery, and streak reminders are represented here with production-ready structure and placeholder delivery."
      />
      {[
        "06:30 workout reminder for strength day",
        "18:00 running reminder for threshold session",
        "21:15 recovery reminder for sleep winddown",
        "Missed-streak reminder after inactive evening"
      ].map((item) => (
        <Card key={item}>
          <Text style={styles.item}>{item}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 22
  }
});
