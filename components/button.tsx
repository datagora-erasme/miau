import {Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ButtonProps {
    title: string;
    onPress: ()=> void ;
    bgColor: string
    iconName: MaterialIconName | null
    disabled: boolean




}
export default function Button({iconName, title, bgColor, onPress, disabled}: ButtonProps) {
    const fontColor = bgColor.includes('red') || bgColor.includes('gray') ? "text-white" : "text-red-600"
    const iconColor = bgColor.includes('red') || bgColor.includes('gray') ? "white" : "red"

    return (
        <TouchableOpacity
        disabled={disabled}
        className={`${disabled ? "bg-gray-400" : bgColor} p-4 rounded-xl items-center justify-center flex-row`}
        onPress={onPress}>
            {iconName && 
            <MaterialCommunityIcons name={iconName} color={iconColor} size={20}></MaterialCommunityIcons>}
            <Text className={`${fontColor}`}>{title}</Text>
        </TouchableOpacity>
    )
}