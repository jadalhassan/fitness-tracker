import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../theme";

type CardProps = PropsWithChildren<{
  glow?: boolean;
}>;

export function Card({ children, glow = false }: CardProps) {
  return (
    <LinearGradient
      colors={
        glow
          ? ["rgba(124,243,200,0.18)", "rgba(16,20,29,0.98)"]
          : ["rgba(255,255,255,0.06)", "rgba(16,20,29,0.94)"]
      }
      style={styles.card}
    >
      <View style={[styles.inner, glow && styles.glow]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg
  },
  inner: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm
  },
  glow: {
    shadowColor: colors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10
  }
});
