import { Link, useRouter } from 'expo-router'

import { View, Text, TextInput  } from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'


export default function StepThree() {
    const router = useRouter()

    const handleNext = () => {
        router.push('/(form)/step2')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Text className="text-xl font-extrabold">
                    Ajout de justificatifs à un dossier d&apos;administré
                </Text>
                <View className="items-center">
                    <Stepper currentStep={3}></Stepper>
                </View>
                <View className="gap-2">
                    <Text>Séléctionner un administré</Text>
                    <TextInput placeholder="Tappez les première lettres" placeholderTextColor='black' className='bg-white'></TextInput>
                </View>
                <View>
                    <View className="self-end">
                        <Button title="suivant" bgColor='bg-red-700' onPress={handleNext} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}