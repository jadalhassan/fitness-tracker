import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { register } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { useAuthStore } from "../../store/auth-store";
import { useToastStore } from "../../store/toast-store";
import { spacing } from "../../theme";

export function RegisterScreen({ navigation }: { navigation: any }) {
  const [firstName, setFirstName] = useState("Ava");
  const [lastName, setLastName] = useState("Reed");
  const [email, setEmail] = useState("ava@athletica.app");
  const [password, setPassword] = useState("Strong123!");
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const pushToast = useToastStore((state) => state.push);

  async function handleRegister() {
    try {
      setLoading(true);
      const payload = await register({
        email,
        password,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        age: 27,
        heightCm: 172,
        weightKg: 68,
        weeklyFrequency: 4,
        fitnessLevel: "beginner",
        preferredDisciplines: ["gym", "running"],
        equipmentAvailability: ["dumbbells", "bench"]
      });
      signIn(payload);
      pushToast({ title: "Account created. Finish onboarding next.", tone: "success" });
    } catch {
      pushToast({ title: "Could not create account", tone: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Create Account"
        title="Build your athlete profile."
        subtitle="We'll tailor your starter plan, recovery guidance, and default training flow once you're in."
      />
      <View style={styles.row}>
        <View style={styles.flex}>
          <Input label="First name" value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={styles.flex}>
          <Input label="Last name" value={lastName} onChangeText={setLastName} />
        </View>
      </View>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button label={loading ? "Creating..." : "Create account"} onPress={handleRegister} />
      <Button label="Back to sign in" onPress={() => navigation.goBack()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm
  },
  flex: {
    flex: 1
  }
});
