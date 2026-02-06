import { Link, useRouter } from 'expo-router'
import {useState, useEffect} from 'react'
import { View, Text  } from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import DropDown from '../../components/dropdown'
import  {useForm}  from '../../store/useFormStore';


export default function StepOne() {
    const router = useRouter()
    const addData = useForm((state) => state.addData)
    const store = useForm((state) => state)

    let data: { label: any; value: any }[] = []

    

    useEffect(() => {
        const fetchGristData = async () => {
            const apiKey = process.env.EXPO_PUBLIC_GRIST_API_KEY
            const docId = process.env.EXPO_PUBLIC_GRIST_DOC_ID
            const host = process.env.EXPO_PUBLIC_GRIST_HOST

            const response = await fetch(`https://${host}/api/docs/${docId}/tables/Beneficiaires/records`, {
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
                data.push({label: record.fields.Beneficiaire, value: record.fields.Numero_DP})
            })
        }
        fetchGristData();
    }, [])

    const [beneficiary, setBeneficiary] = useState(null)

    const onChangeBeneficiary = (beneficiaryItem: any) => {
        setBeneficiary(beneficiaryItem.label)
        addData({beneficiary: beneficiaryItem.label, NumeroDP: beneficiaryItem.value})
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
                <View className="gap-2">
                    <Text>Séléctionner un bénéficiaire</Text>
                    <DropDown data={data} placeholder="Taper les premières lettres" onChange={onChangeBeneficiary} search={true} ></DropDown>
                </View>
                <View>
                    <View className="self-end">
                        <Button iconName={null} title="suivant" bgColor='bg-red-600' onPress={handleNext} disabled={!beneficiary}  ></Button>
                    </View>
                </View>
            </View>
        </View>
    )
}