import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { forgotPassword } from "../../api/auth";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Screen } from "../../components/ui/Screen";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors, typography } from "../../theme";

export function ForgotPasswordScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("demo@athletica.app");
  const [token, setToken] = useState<string | null>(null);

  async function handleRequest() {
    try {
      const result = await forgotPassword(email);
      setToken(result.token);
    } catch {
      setToken("DEMO42");
    }
  }

  return (
    <Screen>
      <SectionHeader
        eyebrow="Reset Password"
        title="Request a reset token."
        subtitle="Email delivery is stubbed for now, so the backend returns a temporary token directly."
      />
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Button label="Request token" onPress={handleRequest} />
      {token ? (
        <Card>
          <Text style={styles.tokenLabel}>Reset token</Text>
          <Text style={styles.token}>{token}</Text>
        </Card>
      ) : null}
      <Button label="Back" onPress={() => navigation.goBack()} variant="ghost" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tokenLabel: {
    color: colors.textMuted,
    fontSize: typography.small,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  token: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800"
  }
});
