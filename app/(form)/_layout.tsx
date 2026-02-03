import {Stack} from 'expo-router'
import {View, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FormLayout() {
    return(
        <SafeAreaView className=" flex-1">
            <View className= "py-2 pl-4 bg-red-800 h-[4em] ">
                <Text className="text-white">Contrôle</Text>
                <Text className="text-white">d&apos;effectivité - APA</Text>
            </View>
            <Stack screenOptions={{headerShown: false}}/>
        </SafeAreaView>

    )
}