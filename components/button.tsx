import {Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';


type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ButtonProps {
    title?: string;
    onPress: () => void ;
    bgColor: string
    iconName?: MaterialIconName | null
    isLoading? : boolean,
    disabled?: boolean




}
export default function Button({iconName, title, bgColor, onPress, disabled, isLoading}: ButtonProps) {
    const fontColor = bgColor.includes('red')  ? "text-white" : "text-red-600"
    const iconColor = bgColor.includes('red')  ? "white" : "red"

    return (
        <TouchableOpacity
        disabled={disabled}
        style={{borderWidth: disabled ? 0 : 1, borderColor:"#DC2626"}}
        className={`p-3 rounded-xl items-center justify-center flex-row gap-2 ${disabled ? "bg-gray-400" : `${bgColor}` }  ` }
        onPress={() => onPress()}>
            { isLoading ?
            <ActivityIndicator color="grey"/>
            :
            iconName ? 
            <MaterialCommunityIcons name={iconName} color={iconColor} size={20}></MaterialCommunityIcons>
            : null }
            <Text className={`${fontColor} font-extrabold`}>{title}</Text>
        </TouchableOpacity>
    )
}