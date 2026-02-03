import {View, Text, TextInput } from 'react-native'
import Button from '../components/button'
import {useRouter} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'


export default function Index() {
    const router = useRouter()
    const handleLogin = async () => { 
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/(form)/step1')

    }
    return(
        <SafeAreaView className=' flex-1 bg-gray-200'>
            <View className="flex-row gap-10 h-[10%]">
                <View className="bg-blue-400  flex-1"></View>
                <View className="bg-red-600  flex-1"></View>
            </View>
            <View className="flex-1 mx-10  gap-3">
                <Text className="text-center mt-10">Contrôle d&apos;effectivité - APA</Text>
                <View className=" bg-gray-300 flex-1">
                    <Text className="border ">Connexion</Text>
                    <Text className="border">Indentifiant</Text>
                    <TextInput placeholder='adresse email' className="border"></TextInput>

                    <Button title={"Connexion"} bgColor={"bg-red-600"} onPress={handleLogin}/>
                </View>
            </View>
            <View className="h-[15%] mt-20" >
                <View className="bg-green-700 flex-1"></View>
            </View>
        </SafeAreaView>
    )
}