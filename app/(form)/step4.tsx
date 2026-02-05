import React, {useState, useEffect} from 'react'
import { useRouter } from 'expo-router'
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import  {useForm}  from '../../store/useFormStore';



export default function StepFour() {
    const router = useRouter()
    const Form = useForm.getState()

    const documents = useForm((state) => state.documents)
    const docs = documents?.length

    const person = useForm((state) => state.beneficiary)
    
    const handleNext = () => {
        
        router.push('/(form)/step5')
    }

    const handlePrevious = () => {
        
        router.back()
    }

    const handleCancel = () => {
        router.replace('./step3')
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
                        <Text className="italic">Vous allez transmettre :</Text>
                        {docs&& 
                        <Text className='font-extrabold'>{docs} pièce{docs > 1 ? "s" : ""}</Text>
                        }
                    </View>
                        {documents ? documents.map((doc, index) => {
                            return (
                            <View key={index} className="bg-gray-200 p-3 gap-3 ">
                                <Text className="font-extrabold">
                                    Pièce n°{index + 1}
                                </Text>
                                <View className="flex-row gap-3">
                                    <Text className="italic">Type</Text>
                                    <Text className="font-extrabold">{doc.type}</Text>
                                </View>
                            </View>

                            )
                        }) : null }
                    <View>

                    </View>
                </View>
                    <View className="flex-row justify-between w-full">
                        <Button iconName={null} title="Précédent" bgColor="bg-white" onPress={handlePrevious} disabled={false}></Button>
                        <Button iconName={null} title="Annuler" bgColor="bg-white" onPress={handleCancel} disabled={false}></Button>
                        <Button iconName={"check-circle-outline"} title="Envoyer" bgColor='bg-red-600' onPress={handleNext} disabled={false}></Button>
                    </View> 
            </View>
        </View>
    )
}