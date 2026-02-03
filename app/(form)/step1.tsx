import { Link } from 'expo-router'
import { View } from 'react-native'

export default function StepOne() {
    return(
        <View>
            <Link href="/test" className="text-white mt-10"> aller au scanner</Link>
        </View>
    )
}