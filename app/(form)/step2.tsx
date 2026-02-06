import { Link, useRouter } from 'expo-router'
import {useState, useEffect} from 'react'

import { View, Text, TextInput  } from 'react-native'
import Stepper from '../../components/stepper'
import DropDown from '../../components/dropdown'
import Button from '../../components/button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  {useForm}  from '../../store/useFormStore';


export default function StepOne() {
    const router = useRouter()
    const addControl = useForm((state)=> state.addData)
    let data: { label: string; value: string }[] = []
    const nDP = useForm((state) => state.NumeroDP)
    const filtre = {"Beneficiaire_Numero_DP" : [nDP]}
    const filtreEncode = encodeURIComponent(JSON.stringify(filtre))

    useEffect(() => {
            const fetchGristData = async () => {
                const apiKey = process.env.EXPO_PUBLIC_GRIST_API_KEY
                const docId = process.env.EXPO_PUBLIC_GRIST_DOC_ID
                const host = process.env.EXPO_PUBLIC_GRIST_HOST
                const response = await fetch(`https://${host}/api/docs/${docId}/tables/Controles/records?filter=${filtreEncode}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    console.error("erreur detail", errorData)
                }
                const result = await response.json()
                result.records.map((record : any) => {
                    data.push({label: record.fields.identifiant, value: record.fields.identifiant })
                })
                
            }
            fetchGristData();
        }, [])

    const handleChange = () => {
        
    }
    const handleNext = () => {
        
        router.push('/(form)/step3')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={2}></Stepper>
                <View className="gap-2">
                    <Text>Validez le contrôle en cours</Text>
                    <DropDown data={data}  placeholder={null} search={false} onChange={handleChange} ></DropDown>
                </View>
                <View className="bg-white flex-row border-l-2 border-blue-500 items-center ">
                    <View className="m-2">
                        <MaterialCommunityIcons name="information-variant-circle-outline" size={20} color="#3b82f6"/>
                    </View>
                    <Text className=" m-2">Le contrôle doit avoir été crée dans l&apos;espace Grist</Text>
                </View>
                <View>
                    <View className="flex-row justify-between">
                        <Button iconName={null} title="Précédent" bgColor='bg-white' onPress={handleNext} disabled={false} ></Button>
                        <Button iconName={null} title="Annuler" bgColor='bg-white' onPress={handleNext} disabled={false} ></Button>
                        <Button iconName={null} title="Suivant" bgColor='bg-red-600' onPress={handleNext} disabled={false} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}