import {View, Text} from 'react-native'

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
            <View className='flex-row gap-10 justify-center '>
                {steps.map((step, index) => {
                    
                    const isActive = currentStep === step
                    return(
                        <Text key={index} className={`${isActive ? "rounded-full bg-red-200" : ""}`} >{step}</Text>
                    )
                })}

            </View>
        </View>
    )
}