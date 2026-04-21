import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import type { RootStackParamList } from "../../navigation/types";
import { useAuthStore } from "../../store/auth-store";
import { colors, spacing, typography } from "../../theme";

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  if (!user) {
    return <Screen />;
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Profile"
        title={user.fullName}
        subtitle={`${user.profile.fitnessLevel} athlete | ${user.profile.weeklyFrequency} training days weekly`}
      />

      <Card glow>
        <Text style={styles.metric}>{user.streak} day streak</Text>
        <Text style={styles.copy}>Current goal: {user.goals[0]?.target ?? "Build consistent momentum"}</Text>
      </Card>

      <Card>
        <Text style={styles.title}>Preferred disciplines</Text>
        <View style={styles.wrap}>
          {user.profile.preferredDisciplines.map((discipline) => (
            <Pill key={discipline} label={discipline} />
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.title}>Achievements</Text>
        {user.achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementRow}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementCopy}>{achievement.description}</Text>
          </View>
        ))}
      </Card>

      <Button label="Settings" onPress={() => navigation.navigate("Settings")} />
      <Button label="Notifications" onPress={() => navigation.navigate("Notifications")} variant="secondary" />
      <Button label="Athletica Pro" onPress={() => navigation.navigate("Subscription")} variant="secondary" />
      <Button label="Sign out" onPress={signOut} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  metric: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  achievementRow: {
    gap: 4,
    paddingTop: spacing.sm
  },
  achievementTitle: {
    color: colors.text,
    fontWeight: "700"
  },
  achievementCopy: {
    color: colors.textMuted,
    lineHeight: 20
  }
});
