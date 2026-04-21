import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../theme";

export function LoadingBlock({ height = 112 }: { height?: number }) {
  return <View style={[styles.block, { height }]} />;
}

const styles = StyleSheet.create({
  block: {
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md
  }
});
