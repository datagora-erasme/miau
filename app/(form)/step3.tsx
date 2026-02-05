import React, {useState, useEffect} from 'react'
import { useRouter } from 'expo-router'
import {scanDocument} from "../../utils/scanDocument" 
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import  {useForm}  from '../../store/useFormStore';
import DropDown from '../../components/dropdown'

interface Document {
    uri: string
    type: string 
}



export default function StepThree() {
    const router = useRouter()
    const documentTypes = [{label: "Ticket de caisse", value: "Ticket de caisse"}, {label:"Echéancier", value: "Echéancier" }, {label: "Certificat Médical", value: "Certificat Médical" }]

    const person = useForm((state) => state.beneficiary)
    const AddData = useForm((state) => state.addData)

    const [documents, setDocuments] = useState<Document[]>([])
    const [scannedImages, setScannedImages] = useState<string[]>([]);
    const [isMissingType, setIsMissingType] = useState(false)
    
    const typeDoc = (type: any) => {
        const lastImage = scannedImages.at(-1)
        const typeValue = type.value
        if (lastImage) {
            const NewDoc: Document = {uri: lastImage, type:typeValue}
            setDocuments((prev) => [...prev, NewDoc])
            setIsMissingType(false)
        }
    
    }

    const handleScan = async () => {
        const result = await scanDocument()
        if ( result && result.length > 0) {
            setScannedImages((prev) => [...prev, result[0]]);
            setIsMissingType(true)


        }
    }
    const handleNext = () => {
        if(documents.length > 0) {
            AddData({documents: documents})
            router.push('/(form)/step4')

        }
    }

    const handlePrevious = () => {
        
        router.back()
    }

    const handleCancel = () => {
        router.replace('./step1')
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
                        <Text className='font-extrabold'>{0}</Text>
                    </View>
                    {scannedImages ? scannedImages.map((scan, index) => {
                        return(
                            <View key={index} className="bg-gray-200 p-3 gap-3">
                                <Text className="font-extrabold">Pièce n°{index+1}</Text>
                                <DropDown data={documentTypes} placeholder="Selectionner le type de document" onChange={typeDoc} search={false} ></DropDown>
                            </View>
                        )
                    }) : null
                    }

                    <View>

                    </View>
                    <Button iconName="plus" title="Ajouter une pièce" bgColor="bg-red-600" onPress={(handleScan)} disabled={isMissingType}></Button>
                </View>
                <View>
                    <View className="flex-row justify-between">
                        <Button iconName={null} title="Précédent" bgColor="bg-white" onPress={handlePrevious} disabled={false}></Button>
                        <Button iconName={null} title="Annuler" bgColor="bg-white" onPress={handleCancel} disabled={false}></Button>
                        <Button iconName={null} title="Suivant" bgColor='bg-red-600' onPress={handleNext} disabled={documents.length === 0} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}



