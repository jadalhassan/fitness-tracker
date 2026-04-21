import { useQuery } from "@tanstack/react-query";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getAnalyticsOverview } from "../../api/fitness";
import { Card } from "../../components/ui/Card";
import { Pill } from "../../components/ui/Pill";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { activityHeatmap } from "../../data/demo-data";
import { colors, spacing, typography } from "../../theme";

const chartWidth = Dimensions.get("window").width - 44;

export function ProgressDashboardScreen() {
  const { data } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsOverview
  });

  if (!data) {
    return <Screen />;
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Progress"
        title="Weekly and monthly trends."
        subtitle="Strength, endurance, recovery, frequency, volume, PRs, and heatmap-ready history."
      />
      <Card glow>
        <Text style={styles.title}>Weight trend</Text>
        <LineChart
          data={{
            labels: ["W1", "W2", "W3", "W4"],
            datasets: [{ data: data.weightTrend }]
          }}
          width={chartWidth}
          height={220}
          withDots
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          transparent
          chartConfig={{
            color: () => colors.accent,
            labelColor: () => colors.textMuted,
            propsForBackgroundLines: { stroke: "transparent" }
          }}
          style={styles.chart}
          bezier
        />
      </Card>

      <Card>
        <Text style={styles.title}>Readiness trend</Text>
        <View style={styles.barRow}>
          {data.readinessTrend.map((value, index) => (
            <View key={`${value}-${index}`} style={styles.barItem}>
              <View style={[styles.bar, { height: Math.max(28, value) }]} />
              <Text style={styles.barLabel}>{value}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.title}>Heatmap-ready frequency</Text>
        <View style={styles.barRow}>
          {activityHeatmap.map((cell) => (
            <View key={cell.label} style={styles.barItem}>
              <View style={[styles.heatCell, { opacity: cell.value }]} />
              <Text style={styles.barLabel}>{cell.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.title}>Recent PRs</Text>
        <View style={styles.tags}>
          {data.prs.map((pr) => (
            <Pill key={pr} label={pr} />
          ))}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: "700"
  },
  chart: {
    marginLeft: -22,
    borderRadius: 16
  },
  barRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.sm
  },
  barItem: {
    flex: 1,
    alignItems: "center",
    gap: 8
  },
  bar: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: colors.accent
  },
  heatCell: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.accentBlue
  },
  barLabel: {
    color: colors.textMuted,
    fontSize: typography.small
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
