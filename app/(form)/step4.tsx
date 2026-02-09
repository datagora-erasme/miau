import React, {useState, useEffect} from 'react'
import { useRouter } from 'expo-router'
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import  {useForm}  from '../../store/useFormStore';
import IconButton from '../../components/iconButton'
import sendToGrist from "../../utils/sendToGrist"




export default function StepFour() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const Form = useForm((state) => state)

    const documents = useForm((state) => state.documents)
    const docs = documents?.length

    const person = useForm((state) => state.beneficiary)
    
    const handleSend = async () => {
        setIsLoading(true)
        try {
            await sendToGrist(Form)
            router.push('/(form)/step5')
        } catch(error) {
            setError("Erreur : Certains documents n'ont pas pu être envoyés, veuillez ressayer.")
        }
        setIsLoading(false)
    }

    const handlePrevious = () => {
        router.back()
    }

    const handleCancel = () => {
        router.push('/modal')
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
                    {error ? <Text className=" text-red-600">{error}</Text> : null }
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
                        <Button iconName={"check-circle-outline"} title={isLoading ? "Envoi..." : "Envoyer"} bgColor='bg-red-600' onPress={handleSend} disabled={isLoading}></Button>
                    </View> 
            </View>
        </View>
    )
}