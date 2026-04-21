import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useToastStore } from "../store/toast-store";
import { colors, radius, spacing, typography } from "../theme";

export function ToastHost() {
  const items = useToastStore((state) => state.items);
  const dismiss = useToastStore((state) => state.dismiss);

  useEffect(() => {
    const timers = items.map((item) =>
      setTimeout(() => {
        dismiss(item.id);
      }, 2500)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [dismiss, items]);

  return (
    <View pointerEvents="none" style={styles.container}>
      {items.map((item) => (
        <View
          key={item.id}
          style={[
            styles.toast,
            item.tone === "success" && styles.success,
            item.tone === "error" && styles.error
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 70,
    left: spacing.md,
    right: spacing.md,
    gap: spacing.sm
  },
  toast: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md
  },
  success: {
    borderColor: "rgba(107,229,163,0.4)"
  },
  error: {
    borderColor: "rgba(255,112,112,0.4)"
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600"
  }
});
