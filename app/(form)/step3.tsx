import React, {useState, useEffect} from 'react'
import { Link, useRouter } from 'expo-router'
import {scanDocument} from "../../utils/scanDocument" 
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import DropDown from '../../components/dropdown'


interface Document {
    uri: string
    type: string
    beneficiaryId: number
}

interface Type {
    label: string
    value: string
}

export default function StepThree() {
    const [scannedImages, setScannedImages] = useState<string[]>([]);

    // uniquement pour debugger, à changer par un localstorage peut etre ? 
    const [type, setType] = useState<Type[]>([])
    
    const typeDoc = (type: any) => {
        setType(type.value)
    }
    //
    const [documents, setDocuments] = useState<Document[]>([])


    const person = `Natacha Belaud ${type}`
    const documentTypes = [{label: "Tiket de caisse", value: "Ticket de caisse"}, {label:"Echéancier", value: "Echéancier" }, {label: "Certificat Médical", value: "Certificat Médical" }]
    const router = useRouter()

    const handleScan = async () => {
        const result = await scanDocument()
        if ( result && result.length > 0) {
            // set the img src, so we can view the first scanned image
            setScannedImages((prev) => [...prev, ...result])
        }
    }
    const handleNext = () => {
        router.push('/(form)/step4')
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={3}></Stepper>
                <View className="gap-2 flex-row">
                    <Text>Dossier :</Text>
                    <Text className="font-extrabold">{person}</Text>
                </View>
                <View className=" bg-white p-3 gap-2 ">
                    <View className="flex-row gap-3">
                        <Text>Nombre de pièces:</Text>
                        <Text className='font-extrabold'>0</Text>
                    </View>
                        {scannedImages.map((scan, index) => {
                            return (
                            <View key={index} className="bg-gray-200 p-3 gap-3 border-l  border-black">
                                <Text className="font-extrabold">
                                    Pièce n°{index + 1}
                                </Text>
                                <DropDown data={documentTypes} placeholder="Selectionner un type de document" onChange={typeDoc} search={false}/>
                            </View>

                            )
                        })}
                    <View>

                    </View>
                    <Button iconName="plus" title="Ajouter une pièce" bgColor="bg-red-700" onPress={(handleScan)} desabled={false}></Button>
                </View>
                <View>
                    <View className="self-end">
                        <Button iconName={null} title="Suivant" bgColor='bg-red-700' onPress={handleNext} desabled={!type} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}