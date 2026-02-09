import React, {useState, useEffect} from 'react'
import { useRouter } from 'expo-router'
import {scanDocument} from "../../utils/scanDocument" 
import { View, Text} from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import  {useForm}  from '../../store/useFormStore';
import DropDown from '../../components/dropdown'
import IconButton from '../../components/iconButton'

interface Document {
    uri: string
    type: string 
}



export default function StepThree() {
    const router = useRouter()
    const documentTypes = [{label: "Ticket de caisse", value: "Ticket de caisse"}, {label:"Echéancier", value: "Echéancier" }, {label: "Certificat Médical", value: "Certificat Médical" }]

    const person = useForm((state) => state.beneficiary)
    const Store = useForm((state) => state)
    const AddDocument = useForm((state) => state.addDocument)
    const updateDocument = useForm((state) => state.updateDocument)
    const deleteDocument = useForm((state) => state.deleteDocument)
    const resetData = useForm((state) => state.resetData)
    const StoredDocs = useForm((state) => state.documents)
    const AllTyped = StoredDocs && StoredDocs.length > 0 && StoredDocs.every((StoredDoc) => StoredDoc.type !== null )
    const CanAdd = StoredDocs.length === 0 || AllTyped

    
    const handleScan = async () => {
        const result = await scanDocument()
        if ( result && result.length > 0) {
            AddDocument({uri: result[0], type: null})
            
        }
    }
    const typeDoc = (item: any, index: number ) => {
        const errors = []
        const typeValue = item.value
        if (!StoredDocs || !StoredDocs[index]){
        errors.push("scan introuvable")
        console.error('pas de scan trouvé')
        return
        }
        updateDocument(index, typeValue)
        
        console.log("store", Store)
        
    
    
    }

    const handleDelete = (index: number) => {
        if (!StoredDocs || !StoredDocs[index]){
        console.error('pas de scan trouvé')
        return
        }
        deleteDocument(index)

    }
    const handleNext = () => {
        router.push('/(form)/step4')

    }

    const handlePrevious = () => {
        
        router.back()
    }

    const handleCancel = () => {
        router.push('/(form)/modal')
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
                        <Text className='font-extrabold'>{StoredDocs?.length  === 0 ? "0" : StoredDocs?.length }</Text>
                    </View>
                    {StoredDocs ? StoredDocs.map((StoredDoc, index) => {
                        return(
                            <View key={index} className="bg-gray-200 p-3 gap-3 flew-row">
                                <View className="flex-row justify-between">
                                    <Text className="font-extrabold">Pièce n°{index+1}</Text>
                                    <IconButton name="delete-empty" onPress={() => handleDelete(index)}></IconButton>
                                </View>
                                <DropDown value={StoredDoc.type} data={documentTypes} placeholder="Selectionner le type de document" onChange={(item) => typeDoc(item, index as number)} search={false} ></DropDown>
                            </View>
                        )
                    }) : null
                    }

                    <View>

                    </View>
                    <Button iconName="plus" title="Ajouter une pièce" bgColor="bg-red-600" onPress={(handleScan)} disabled={!CanAdd}></Button>
                </View>
                <View>
                    <View className="flex-row justify-between">
                        <Button iconName={null} title="Précédent" bgColor="bg-white" onPress={handlePrevious} disabled={false}></Button>
                        <Button iconName={null} title="Annuler" bgColor="bg-white" onPress={handleCancel} disabled={false}></Button>
                        <Button iconName={null} title="Suivant" bgColor='bg-red-600' onPress={handleNext} disabled={!AllTyped} ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}



