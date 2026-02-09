
import {View, Text} from 'react-native'
import IconButton from '../../components/iconButton'
import Button from '../../components/button'
import {useRouter} from 'expo-router'
import  {useForm}  from '../../store/useFormStore';

export default function Modal() {
    const router = useRouter()
    const resetData = useForm((state) => state.resetData)

    const handleCancel = () => {
        resetData()
        router.dismissAll()
        router.replace('/(form)/step1')
    }
    return(
        <View style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} className="flex-1 items-center justify-center"> 
            <View className="bg-white p-7 mx-10 gap-5 shadow-lg shadow-black ">
                <View className="flex-row justify-between">
                    <View className="flex-row">
                        <Text className="font-extrabold text-lg">Attention</Text>
                    </View>
                    <IconButton name="close" onPress={() => router.back()}></IconButton>
                </View>
                <View className="gap-7">
                    <Text>
                        Vous vous apprêtez à annuler la saisie des informations pour un administré, aucune information ne sera sauvegardée.
                    </Text>
                    <Text>
                        Que souhaitez-vous faire ?
                    </Text>
                </View>
                <View className="gap-4">
                    <Button title="Continuer la saisie" bgColor={"bg-red-600"} onPress={() => router.back()} disabled={false}></Button>
                    <Button title="Quitter sans enregistrer" bgColor={"bg-white"} onPress={handleCancel} disabled={false}></Button>

                </View>
            </View>
        </View>
    )
}