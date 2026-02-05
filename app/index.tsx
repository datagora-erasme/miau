import {View, Text, TextInput, Image } from 'react-native'
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
        <SafeAreaView className=' flex-1'>
            <View className="flex-row  h-[10%] w-full gap-10 px-3">
                <View className="w-[50%]">
                    <Image source={require("../assets/images/Miaau.png")} resizeMode="contain" className="h-full w-full"/>
                </View>
                <View className="flex-1 ">
                    <Image source={require("../assets/images/mgl.png")} resizeMode="contain" className="h-full w-full"/>
                </View>
            </View>
            <View className=" mx-10  gap-3 flex-1">
                <Text className="text-center mt-10 text-xl font-extrabold text-red-600">Contrôle d&apos;effectivité - APA</Text>
                <View className=" bg-gray-200 p-5 gap-5 shadow-lg shadow-black">
                    <Text className="text-xl font-extrabold ">Connexion</Text>
                    <View className="gap-2">
                        <Text className="">Identifiant</Text>
                        <TextInput placeholder='adresse email' placeholderTextColor="black" className={`bg-white`}></TextInput>
                    </View>
                    <View className="gap-2">
                        <Text className="">Mot de passe</Text>
                        <TextInput placeholder='Mot de passe' placeholderTextColor="black" className={`bg-white`}></TextInput>
                    </View>
                    <View className="self-end">
                        <Button iconName={null} title={"Connexion"} bgColor={"bg-red-600"} onPress={handleLogin} disabled={false}/>
                    </View>
                    <View className="flex-row justify-center gap-2">
                        <Text className="italic">Version 0.0.1</Text>
                        <View className="bg-red-200 rounded-full px-3">  
                            <Text className="italic">Alpha</Text>
                        </View>

                    </View>
                </View>
            </View>
            <View className=" w-full h-[25%]  relative items-end  " >
                <Image source={require("../assets/images/Vector.png")}  className="absolute  w-full h-full  " />
                <Image source={require("../assets/images/characters.png")} resizeMode="cover"  className=" h-[100%]" style={{ aspectRatio: 1 }}/>
            </View>h-full w-fu
        </SafeAreaView>
    )
}