import {useState, useEffect} from 'react'
import  {useForm, useAuthStore}  from '../../store/useFormStore';
import { useRouter } from 'expo-router'
import { View, Text, Image} from 'react-native'
import Button from '../../components/button'
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function StepFive() {
    const router = useRouter()
    const {beneficiary, counter, resetData} = useForm((s) => s)
    const {setToken} = useAuthStore((s) => s)
    const [beneficiaryName, setBeneficiaryName] = useState<string>("")
    const [countOfDocs, setCountOfDocs] = useState<number>(0)
    console.log("compter", counter)
    
    
    useEffect(() => {
        const handleReset = () => {
            setBeneficiaryName(beneficiary as string)
            setCountOfDocs(counter)
            resetData()
        }
        handleReset()
    }, [])

    const handleNew = () => {
        setCountOfDocs(0)
        router.replace('/step1')
    }

    const handlelogOut = () => {
        setToken(null)
        router.replace('/')
    }
    return (
        <View className="">
            <View className="bg-gray-200 p-5 my-5 mx-10 gap-5 shadow-lg shadow-black ">
                <Text className="text-2xl font-extrabold">Justificatifs envoyés</Text>
                <View className=" bg-white p-3 gap-3 ">
                    <Text className="font-extrabold text-red-600 text-md">Récapitulatif</Text>
                    <View className="flex-row gap-2">
                        <Text className="italic">Dossier :</Text>
                        <Text className="font-extrabold">{beneficiaryName}</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <Text className="italic">Nombre de pièces envoyées :</Text>
                        <Text className="font-extrabold">{countOfDocs}</Text>
                    </View>
                </View>
                <View className=" h-[20%]">
                    <Image source={require("../../assets/images/cat.png")} resizeMode="contain" className=" h-full w-full  " />
                </View>
                <View className="bg-white flex-row border-l-2 border-blue-500 items-center ">
                    <View className="m-2">
                        <MaterialCommunityIcons name="information-variant-circle-outline" size={20} color="#3b82f6"/>
                    </View>
                    <Text className=" m-2">Les données vont être traités par une intelligence artificielle et ajoutés directement sur votre espace Grist.</Text>
                </View>
                <Button iconName="plus" title="Nouvel ajout" bgColor='bg-red-600' onPress={handleNew} disabled={false}></Button>
                <Button iconName="power-standby" title="Déconnexion" bgColor='bg-white' onPress={handlelogOut} disabled={false}></Button>
            </View>
        </View>

    )
}