import { makeRedirectUri } from "expo-auth-session";
import { Stack, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/iconButton";
import { useAuthStore } from "../../store/useFormStore";

export default function FormLayout() {
  const router = useRouter();
  const { setToken } = useAuthStore((s) => s);

  const onPress = async () => {
    setToken(null);
    const logoutRedirectUri = makeRedirectUri({
      scheme: "miau",
      path: "oauth/logout",
    });
    const logoutUrl = `https://dev-auth.exo-dev.fr:44301/realms/metropole/protocol/openid-connect/logout?client_id=miau&post_logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}`;
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        logoutUrl,
        logoutRedirectUri,
      );
    } catch (error) {
      router.replace("/");
    }
  };


  return (
    <SafeAreaView className=" flex-1">
      <View className="py-2 px-4 bg-red-800 h-[4em] flex-row justify-between items-center">
        <View>
          <Text className="text-white font-extrabold">Contrôle</Text>
          <Text className="text-white font-extrabold">
            d&apos;effectivité - APA
          </Text>
        </View>
        <IconButton
          name="power-standby"
          onPress={onPress}
          color={"white"}
          size={30}
        ></IconButton>
      </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="modal"
          options={{ presentation: "transparentModal" }}
        />
      </Stack>
    </SafeAreaView>
  );
}
