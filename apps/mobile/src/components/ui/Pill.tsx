import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../theme";

export function Pill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.small
  }
});
