import {Stack} from 'expo-router'
import {View, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function FormLayout() {
    return(
        <SafeAreaView className=" flex-1">
            <View className= "py-2 px-4 bg-red-800 h-[4em] flex-row justify-between items-center">
                <View>
                    <Text className="text-white font-extrabold">Contrôle</Text>
                    <Text className="text-white font-extrabold">d&apos;effectivité - APA</Text>
                </View>
                <MaterialCommunityIcons name="power-standby" color="white" size={30}></MaterialCommunityIcons>
            </View>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="modal" options={{presentation: 'transparentModal'}}/>

            </Stack>
        </SafeAreaView>
    )
}