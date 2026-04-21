import type { ReactNode } from "react";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useAuthStore } from "../../store/auth-store";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function SettingsScreen() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const pushToast = useToastStore((state) => state.push);
  const [privacyMode, setPrivacyMode] = useState(user?.settings.privacyMode ?? false);
  const [workoutReminders, setWorkoutReminders] = useState(
    user?.settings.notifications.workoutReminders ?? true
  );

  function handleSave() {
    if (!user) {
      return;
    }

    updateUser({
      ...user,
      settings: {
        ...user.settings,
        privacyMode,
        notifications: {
          ...user.settings.notifications,
          workoutReminders
        }
      }
    });
    pushToast({ title: "Settings updated", tone: "success" });
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Settings"
        title="Tune the app around your habits."
        subtitle="Theme, units, reminders, privacy, and account-level placeholders are all here."
      />
      <Card>
        <Row
          label="Privacy mode"
          description="Hide sensitive metrics from previews."
          value={<Switch onValueChange={setPrivacyMode} value={privacyMode} />}
        />
        <Row
          label="Workout reminders"
          description="Morning nudge to start your planned session."
          value={<Switch onValueChange={setWorkoutReminders} value={workoutReminders} />}
        />
      </Card>
      <Card>
        <Text style={styles.title}>Data tools</Text>
        <Text style={styles.copy}>Export and delete-account flows are architected as placeholders and ready to wire into backend jobs later.</Text>
      </Card>
      <Button label="Save changes" onPress={handleSave} />
      <Button label="Export data placeholder" onPress={() => pushToast({ title: "Export flow placeholder" })} variant="secondary" />
      <Button label="Delete account placeholder" onPress={() => pushToast({ title: "Delete account flow placeholder", tone: "error" })} variant="ghost" />
    </Screen>
  );
}

function Row({
  label,
  description,
  value
}: {
  label: string;
  description: string;
  value: ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{label}</Text>
        <Text style={styles.rowCopy}>{description}</Text>
      </View>
      {value}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  rowText: {
    flex: 1,
    gap: 4
  },
  rowTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "700"
  },
  rowCopy: {
    color: colors.textMuted,
    lineHeight: 20
  }
});
