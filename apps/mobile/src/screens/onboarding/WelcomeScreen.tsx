import { StyleSheet, Text } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors, typography } from "../../theme";

export function WelcomeScreen({ navigation }: { navigation: any }) {
  return (
    <Screen>
      <SectionHeader
        eyebrow="Welcome"
        title="This app is built for hybrid athletes."
        subtitle="Lift, run, strike, roll, recover, and track progress from one premium mobile flow."
      />
      <Card glow>
        <Text style={styles.title}>What Athletica tunes for you</Text>
        <Text style={styles.copy}>Goals, fitness level, disciplines, equipment, weekly frequency, and starter planning.</Text>
      </Card>
      <Button label="Start onboarding" onPress={() => navigation.navigate("GoalSelection")} />
    </Screen>
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
  }
});
