import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function SubscriptionScreen() {
  const pushToast = useToastStore((state) => state.push);

  return (
    <Screen>
      <SectionHeader
        eyebrow="Athletica Pro"
        title="Premium analytics and deeper coaching surfaces."
        subtitle="Billing is intentionally a placeholder, but the upgrade surface is ready to connect to a real purchase flow."
      />
      <Card glow>
        <Text style={styles.price}>$11.99 / month</Text>
        <Text style={styles.copy}>Advanced trends, coach-facing insights, custom report exports, and multi-device backup.</Text>
      </Card>
      <View style={styles.list}>
        {[
          "Expanded analytics with chart history",
          "More starter plans and mesocycle templates",
          "Coach notes sync and export placeholders",
          "Priority recovery and fatigue insights"
        ].map((item) => (
          <Card key={item}>
            <Text style={styles.feature}>{item}</Text>
          </Card>
        ))}
      </View>
      <Button label="Upgrade placeholder" onPress={() => pushToast({ title: "Subscription flow placeholder" })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  price: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "800"
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  },
  list: {
    gap: spacing.md
  },
  feature: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 22
  }
});
