import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { login } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useAuthStore } from "../../store/auth-store";
import { useToastStore } from "../../store/toast-store";
import { colors, spacing, typography } from "../../theme";

export function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("demo@athletica.app");
  const [password, setPassword] = useState("Demo1234!");
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const pushToast = useToastStore((state) => state.push);

  async function handleLogin() {
    if (!email || !password) {
      pushToast({ title: "Email and password are required", tone: "error" });
      return;
    }

    try {
      setLoading(true);
      const payload = await login(email, password);
      signIn(payload);
      completeOnboarding();
      pushToast({ title: "Session ready", tone: "success" });
    } catch (error) {
      pushToast({
        title: error instanceof Error ? error.message : "Could not sign in",
        tone: "error"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Athletica"
        title="Train like the premium version of yourself."
        subtitle="Dark-mode-first hybrid fitness tracking built for lifting, running, combat, recovery, and long-term consistency."
      />

      <Card glow>
        <Text style={styles.heroMetric}>9 day streak</Text>
        <Text style={styles.heroLabel}>Jordan is already locked in for tonight's upper strength block.</Text>
      </Card>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="********"
      />

      <Button label={loading ? "Signing in..." : "Sign In"} onPress={handleLogin} />

      <View style={styles.row}>
        <Button label="Apple Sign-In" onPress={() => pushToast({ title: "Apple sign-in placeholder" })} variant="secondary" style={styles.flex} />
        <Button label="Google Sign-In" onPress={() => pushToast({ title: "Google sign-in placeholder" })} variant="secondary" style={styles.flex} />
      </View>

      <View style={styles.links}>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Create account</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot password</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroMetric: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800"
  },
  heroLabel: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flex: {
    flex: 1
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  link: {
    color: colors.accent,
    fontSize: typography.body,
    fontWeight: "600"
  }
});
