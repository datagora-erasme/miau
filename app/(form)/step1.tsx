import { Link, useRouter } from 'expo-router'
import {useState} from 'react'
import { View, Text  } from 'react-native'
import Stepper from '../../components/stepper'
import Button from '../../components/button'
import DropDown from '../../components/dropdown'
import  {useForm}  from '../../store/useFormStore';


export default function StepOne() {
    const router = useRouter()
    const addBeneficiary = useForm((state) => state.addData)

    const data = [{label: "Mme Dupuis", value:"Mme Dupuis"}, {label:"M. Jacko", value: "M. Jacko"}]
    const [beneficiary, setBeneficiary] = useState(null)

    const onChangeBeneficiary = (beneficiary: any) => {
        setBeneficiary(beneficiary.value)
    }
    const handleNext = () => {
        if (beneficiary) {
            addBeneficiary({beneficiary: beneficiary})
            router.push('/(form)/step2')
        }
    }
    return(
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Stepper currentStep={1}></Stepper>
                <View className="gap-2">
                    <Text>Séléctionner un administré</Text>
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