import {Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
    title: string;
    onPress: ()=> void;
    bgColor: string


}
export default function Button({title, bgColor, onPress}: ButtonProps) {
    console.log(bgColor)
    const fontColor = bgColor.includes('red') || bgColor.includes('gray') ? "text-white" : "text-red-600"

    return (
        <TouchableOpacity 
        className={`${bgColor} p-4 rounded-xl items-center justify-center`}
        onPress={onPress}>
            <Text className={`${fontColor}`}>{title}</Text>
        </TouchableOpacity>
    )
}