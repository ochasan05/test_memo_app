import { JSX } from 'react'
import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import selection from '../../assets/fonts/selection.json'
import icomoonFont from '../../assets/fonts/icomoon.ttf'

const CustomIcon = createIconSetFromIcoMoon(
    selection,
    'IcoMoon',
    'icomoon.ttf'
)

interface Props {
    name: string,
    size: number,
    color: string
}

const Icon = (props: Props): JSX.Element | null => {
    const { name, size, color } = props
    const [fontsLoaded] = useFonts({
        IcoMoon: icomoonFont
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <CustomIcon name={name} size={size} color={color} />
    )
}

export default Icon
