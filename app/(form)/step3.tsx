import React, {useState, useEffect} from 'react'
import { Link, useRouter } from 'expo-router'
import {scanDocument} from "../../utils/scanDocument" 
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function StepThree() {
    const [scannedImages, setScannedImages] = useState<string[]>([]);
    

    const person = "Natacha Belaud"
    const router = useRouter()
    const handleScan = async () => {
        const result = await scanDocument()
        if ( result && result.length > 0) {
            // set the img src, so we can view the first scanned image
            setScannedImages((prev) => [...prev, ...result])
        }
    }
    const handleNext = () => {
        router.push('/(form)/step2')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={3}></Stepper>
                <View className="gap-2 flex-row">
                    <Text>Dossier :</Text>
                    <Text className="font-extrabold">{person}</Text>
                </View>
                <View className=" bg-white p-3 gap-2">
                    <View className="flex-row gap-3">
                        <Text>Nombre de pièces:</Text>
                        <Text className='font-extrabold'>{scannedImages.length}</Text>
                    </View>
                    <Button iconName="plus" title="Ajouter une pièce" bgColor="bg-red-700" onPress={(handleScan)}></Button>
                </View>
                <View>
                    <View className="self-end">
                        <Button iconName={null} title="suivant" bgColor='bg-red-700' onPress={handleNext} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}