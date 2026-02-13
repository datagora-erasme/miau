import { MaterialCommunityIcons } from '@expo/vector-icons';
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Button {
    name: MaterialIconName
    onPress: () => void
    size: number
    color: string
}

export default function IconButton ({name, onPress, size, color}: Button) {
    return(
        <MaterialCommunityIcons name={name} size={size} color={color} onPress={() => onPress()} ></MaterialCommunityIcons>
    )
}