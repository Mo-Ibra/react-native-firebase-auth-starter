import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/authServices";
import { Redirect } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user.email}</Text>
      <Button title="Sign Out" onPress={() => logout()} />
    </View>
  );
}
