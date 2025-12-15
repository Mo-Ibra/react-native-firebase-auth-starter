import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { signUp } from "@/services/authServices";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error: Please enter email and password");
      setError("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error: Password must be at least 6 characters");
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error: Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signUp(email.trim(), password);
      router.replace("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error: Your email is already in use");
        setError("Your email is already in use");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error: Your email is invalid");
        setError("Your email is invalid");
      } else {
        Alert.alert("Error: Something went wrong");
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>
        Create an account
      </Text>

      <TextInput
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        style={{
          backgroundColor: "#16a34a",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Create Account
          </Text>
        )}
      </TouchableOpacity>

      {error && <Text style={{ color: "red", marginTop: 16 }}>{error}</Text>}

      <TouchableOpacity
        onPress={() => router.replace("/sign-in")}
        style={{ marginTop: 16 }}
      >
        <Text style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Text style={{ color: "#16a34a", fontWeight: "bold" }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
