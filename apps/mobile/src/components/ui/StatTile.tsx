import { StyleSheet, Text, View } from "react-native";
import { Card } from "./Card";
import { colors, typography } from "../../theme";

type StatTileProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatTile({ label, value, hint }: StatTileProps) {
  return (
    <Card>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textMuted,
    fontSize: typography.small,
    textTransform: "uppercase",
    letterSpacing: 0.6
  },
  value: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "700"
  },
  hint: {
    color: colors.textSoft,
    fontSize: typography.small
  }
});
