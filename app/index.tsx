import {useEffect} from 'react'
import { makeRedirectUri, useAuthRequest} from "expo-auth-session";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";
import { useAuthStore } from "../store/useFormStore";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const appVersion = Constants.expoConfig?.version;
  const router = useRouter();
  const { userToken, setToken } = useAuthStore((s) => s);


  

  const discovery = {
    authorizationEndpoint: 'https://dev-auth.exo-dev.fr:44301/realms/metropole/protocol/openid-connect/auth',
    tokenEnpoint: 'https://dev-auth.exo-dev.fr:44301/realms/metropole/protocol/openid-connect/token',
    revocationEndpoint: 'https://dev-auth.exo-dev.fr:44301/realms/metropole/protocol/openid-connect/revoke'
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "miau",
      scopes: ["openid", "profile", "email"],
      redirectUri: makeRedirectUri({
        scheme: "miau",
        path: "oauth/callback",
      }),
    },
    discovery,
  );


  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      setToken(code); // On sauve dans MMKV
      router.replace('/step1'); // Navigation immédiate après succès
    }
  }, [response]);

  const handlePress = () => {
    if (userToken) {
      router.replace('/step1');
    } else {
        if (request) {
            promptAsync()
        }
    }
  }

  const handlelogOut = async () => {
    setToken(null)
    const logoutRedirectUri = makeRedirectUri({
        scheme: "miau",
        path: "oauth/logout"
    })
    const logoutUrl =`https://dev-auth.exo-dev.fr:44301/realms/metropole/protocol/openid-connect/logout?client_id=miau&post_logout_redirect_uri=${encodeURIComponent(logoutRedirectUri)}`
    try {
        const result = await WebBrowser.openAuthSessionAsync(logoutUrl, logoutRedirectUri )
    } catch (error) {
        router.replace('/')
    }

  }

  return (
    <SafeAreaView className=" flex-1">
      <View className="flex-row  h-[10%] w-full gap-10 px-3">
        <View className="w-[50%]">
          <Image
            source={require("../assets/images/Miaau.png")}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>
        <View className="flex-1 ">
          <Image
            source={require("../assets/images/mgl.png")}
            resizeMode="contain"
            className="h-full w-full"
          />
        </View>
      </View>
      <View className=" mx-10  gap-3 flex-1">
        <Text className="text-center mt-10 text-xl font-extrabold text-red-600">
          Contrôle d&apos;effectivité - APA
        </Text>
        <View className=" bg-gray-200 p-5 gap-5 shadow-lg shadow-black">
          <Text className="text-xl font-extrabold ">Connexion</Text>

          <View className="gap-2">
            <Button
              iconName={null}
              title={userToken ? "Accéder au service" : "Se connecter" }
              bgColor={"bg-red-600"}
              onPress={handlePress}
              disabled={!request}
            />
            {userToken ? 
            <Button iconName="power-standby" title="Déconnexion" bgColor='bg-white' onPress={handlelogOut} disabled={false}></Button>
            : null
            
            }
            
          </View>
          <View className="flex-row justify-center gap-2">
            <Text className="italic">Version {appVersion}</Text>
            <View className="bg-red-200 rounded-full px-3">
              <Text className="italic">Prototype</Text>
            </View>
          </View>
        </View>
      </View>
      <View className=" w-full h-[25%]  relative items-end  ">
        <Image
          source={require("../assets/images/Vector.png")}
          className="absolute w-full h-full"
        />
        <Image
          source={require("../assets/images/characters.png")}
          resizeMode="cover"
          className=" h-[100%]"
          style={{ aspectRatio: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}
