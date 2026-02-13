import { Stack } from 'expo-router';
import "../global.css"
import {SafeAreaProvider} from 'react-native-safe-area-context'


export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="callback" options={{headerShown: false}}/>
        <Stack.Screen name="logout" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
