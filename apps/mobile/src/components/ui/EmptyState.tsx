import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../theme";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    gap: spacing.sm,
    alignItems: "center"
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.body,
    textAlign: "center",
    lineHeight: 22
  }
});
