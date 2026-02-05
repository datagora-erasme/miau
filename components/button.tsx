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
        style={{borderWidth: disabled ? 0 : 1,
                borderColor:"#DC2626"
        }}
        
        className={`p-4 rounded-xl items-center justify-center flex-row gap-2 ${disabled ? "bg-gray-400" : `${bgColor}` }  ` }
        onPress={onPress}>
            {iconName && 
            <MaterialCommunityIcons name={iconName} color={iconColor} size={20}></MaterialCommunityIcons>}
            <Text className={`${fontColor}`}>{title}</Text>
        </TouchableOpacity>
    )
}