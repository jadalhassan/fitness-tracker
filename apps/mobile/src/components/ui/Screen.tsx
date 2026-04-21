import type { PropsWithChildren } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../theme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
}>;

export function Screen({ children, scroll = true, padded = true }: ScreenProps) {
  const content = (
    <Animated.View style={[styles.content, padded && styles.padded]}>{children}</Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        <View style={styles.fill}>{content}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  fill: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: spacing.xxl
  },
  content: {
    gap: spacing.lg
  },
  padded: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md
  }
});
