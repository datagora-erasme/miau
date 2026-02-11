import { useRouter } from 'expo-router'
import {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import DropDown from '../../components/dropdown'
import  {useForm}  from '../../store/useFormStore';
import {getGrist} from '../../utils/getGrist'

interface GristRecord {
    fields: {
        Beneficiaire: string,
        Numero_DP: string
    }
}

export default function StepOne() {
    const router = useRouter()
    const getNumero = useForm((state) => state.NumeroDP)
    const [beneficiary, setBeneficiary] = useState(getNumero || null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm((state) => state)
    const then = useForm((state) => state.date)
    const expiration_date = useForm((state) => state.expiration_date)
    const addData = useForm((state) => state.addData)
    const resetData = useForm((state) => state.resetData)
    const [data, setData] = useState([])

    const loadData = async () => {
        setError(null)
        setIsLoading(true)
        
        try {
            const result = await getGrist('Beneficiaires/records')
            // throw new Error()
            const formatted_data = result.records.map((record : GristRecord) => ({
            label: record.fields.Beneficiaire, value: record.fields.Numero_DP
            }))
            setData(formatted_data)
        } catch (error: any) {
            if (error.message === "Erreur de connexion à la base de donnée.") {
                setError(error.message)
            } else {
                setError('Erreur de connexion, vérifier le reseau internet.')
            }
            
        } finally {
            setIsLoading(false)
            }
        
    }

    useEffect(() => {
        const now = Date.now()
        if (then && now - then > expiration_date ) {
            resetData()
            setBeneficiary(null)
        }
        loadData();
    }, [])


    const onChangeBeneficiary = (beneficiaryItem: any) => {
        setBeneficiary(beneficiaryItem.value)
        addData({beneficiary: beneficiaryItem.label, NumeroDP: beneficiaryItem.value, date: Date.now()})
    }

    const handleNext = () => {
        if (beneficiary) {
            router.push('/(form)/step2')
        }
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={1}></Stepper>
                    {error ? 
                    <View className="flex-row flex-wrap">
                        <Text className="text-red-600">{error}</Text>
                    </View>
                    : isLoading ? 
                    <View className='flex-row gap-2'>
                        <ActivityIndicator color='grey'/>
                        <Text>Chargement des bénéficiaires...</Text>
                    </View>
                    :<View className="gap-2">
                        <Text>Séléctionner un bénéficiaire :</Text>
                    <DropDown value={beneficiary} data={data} placeholder="Taper les premières lettres" onChange={onChangeBeneficiary} search={true} ></DropDown>
                    </View>
                    }
                <View>
                    <View className="self-end">
                        {error ? 
                        <Button title="Réessayer" bgColor="bg-red-600" onPress={loadData} ></Button>
                        :
                        <Button title="Suivant" bgColor='bg-red-600' onPress={handleNext} disabled={!beneficiary}  ></Button>
                        }
                        
                    </View>
                </View>
            </View>
        </View>
    )
}