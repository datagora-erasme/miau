import React, {useState, useEffect} from 'react'
import { useRouter } from 'expo-router'
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'


interface Document {
    uri: string
    type: string
    beneficiaryId: number
}

interface Type {
    label: string
    value: string
}

export default function StepFour() {
    const router = useRouter()

    const [documents, setDocuments] = useState<Document[]>([])


    const person = `Natacha Belaud`
    
    const handleNext = () => {
        router.push('/(form)/step4')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={4}></Stepper>
                <View className="gap-2 flex-row">
                    <Text>Dossier :</Text>
                    <Text className="font-extrabold">{person}</Text>
                </View>
                <View className=" bg-white p-3 gap-2 ">
                    <View className="flex-row gap-3">
                        <Text>Vous allez transmettre:</Text>
                        <Text className='font-extrabold'>0 pièces</Text>
                    </View>
                        {documents.map((scan, index) => {
                            return (
                            <View key={index} className="bg-gray-200 p-3 gap-3 ">
                                <Text>
                                    Pièce n°{index + 1}
                                </Text>
                                <View className="flex-row gap-3">
                                    <Text>hello</Text>
                                    <Text className="weight-extrabold">woww</Text>
                                </View>
                            </View>

                            )
                        })}
                    <View>

                    </View>
                </View>
                <View>
                    <View className="self-end">
                        <Button iconName={null} title="Suivant" bgColor='bg-red-700' onPress={handleNext} desabled={false}></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}