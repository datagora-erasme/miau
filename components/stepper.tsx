import {View, Text} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';




interface StepperProps {
    currentStep: number
}
export default function Stepper({currentStep}: StepperProps) {
    const steps = [1, 2, 3, 4]
    return (
        <View className="gap-5">
            <Text className="text-xl font-extrabold">
                    Ajout de justificatifs à un dossier d&apos;administré
                </Text>
            <View className='flex-row gap-5 justify-center h-[2em] '>
                {steps.map((step, index) => {
                    
                    const isActive = currentStep === step
                    const isDone = currentStep > step
                    return(
                        <View key={index} className={` aspect-square rounded-full items-center justify-center ${isActive ? " bg-red-200" : isDone ? "bg-green-200" : "" }`}
                        >
                        {isDone ? (
                            <MaterialCommunityIcons name="check" color={"black"} size={20}></MaterialCommunityIcons>
                        ) :
                        <Text className={`text-center ${isActive ? "font-extrabold" : "italic"}`}>{step}</Text>
                        }
                        </View>
                    )
                })}

            </View>
        </View>
    )
}