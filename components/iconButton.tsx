import { MaterialCommunityIcons } from '@expo/vector-icons';
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Button {
    name: MaterialIconName
    onPress: () => void
}

export default function IconButton ({name, onPress}: Button) {
    return(
        <MaterialCommunityIcons name={name} size={20} onPress={() => onPress()} ></MaterialCommunityIcons>
    )
}