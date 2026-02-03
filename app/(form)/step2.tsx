import { Link, useRouter } from 'expo-router'

import { View, Text, TextInput  } from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'



export default function StepOne() {
    const lastControle = "Contrôle du 06-2025 au 11-2025"
    const router = useRouter()

    const handleNext = () => {
        router.push('/(form)/step3')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={2}></Stepper>
                <View className="gap-2">
                    <Text>Validez le contrôle en cours</Text>
                    <Text className='bg-white'>{lastControle}</Text>
                </View>
                <View className="bg-white flex-row border-l-2  border-blue-500">

                    <Text className=" m-2">Le contrôle doit avoir été crée dans l&apos;espace Grist</Text>
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