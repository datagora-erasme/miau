import { Link, useRouter } from 'expo-router'
import {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Stepper from '../../components/stepper'
import DropDown from '../../components/dropdown'
import Button from '../../components/button'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  {useForm}  from '../../store/useFormStore';
import {getGrist} from '../../utils/getGrist'

interface GristData {
    id: number
    fields: {
        identifiant: string, 

    }
}

export default function StepOne() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string |null>(null)
    const [data, setData] = useState([])
    const router = useRouter()
    const getStore = useForm((state) => state)
    const addControl = useForm((state)=> state.addData)
    const getControl = useForm((state) => state.controlId)
    const nDP = useForm((state) => state.NumeroDP)
    const filtre = {"Beneficiaire_Numero_DP" : [nDP]}
    const filtreEncode = encodeURIComponent(JSON.stringify(filtre))
    const endUrl =`Controles/records?filter=${filtreEncode}&sort=-Date_du_debut_du_controle`


    const loadData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await getGrist(endUrl)
            // throw new Error()
            addControl({controlName: result.records[0].fields.identifiant, controlId: result.records[0].id})
            const formatted_data =result.records.map((record : GristData) => ({
                label: record.fields.identifiant, value: record.id
            }))
            setData(formatted_data)
        } catch (error: any) {
            console.log(error)
            if (error.message) {
                setError("Erreur de connexion à la base de données.")
            } else {
                setError('Erreur de connexion, vérifier le reseau internet.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleChange = (control: any) => {
        addControl({controlName: control.label, controlId: control.value})
    }
    
    const handleNext = () => {
        router.push('/(form)/step3')
    }

    const handlePrevious = () => {
        
        router.push('/(form)/step1')

    }

    const handleCancel = () => {
        router.push('/(form)/modal')
    }

    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={2}></Stepper>
                    {error ?
                    <Text className="text-red-600">{error}</Text>
                    : isLoading ?
                    <View className='flex-row'>
                        <ActivityIndicator color="grey"/>
                        <Text>Chargement des contrôles...</Text>
                    </View> :
                    <View className="gap-2">
                        <Text>Validez le contrôle en cours :</Text>
                        <DropDown value={getControl} data={data}  placeholder={null} search={false} onChange={handleChange} ></DropDown>
                    </View>
                    }
                <View className="bg-white flex-row border-l-2 border-blue-500 items-center ">
                    <View className="m-2">
                        <MaterialCommunityIcons name="information-variant-circle-outline" size={20} color="#3b82f6"/>
                    </View>
                    <Text className=" m-2">Le contrôle doit avoir été crée dans l&apos;espace Grist</Text>
                </View>
                <View>
                    <View className="flex-row justify-between">
                        <Button  title="Précédent" bgColor='bg-white' onPress={handlePrevious} ></Button>
                        <Button  title="Annuler" bgColor='bg-white' onPress={handleCancel}  ></Button>
                        {error ? 
                        <Button title="Réessayer" bgColor="bg-red-600" onPress={loadData} ></Button>
                        :
                        <Button title="Suivant" bgColor='bg-red-600' onPress={handleNext} disabled={isLoading} ></Button>
                        }
                        
                    </View>
                </View>
            </View>
        </View>
    )
}