import { defaultStyles } from '@/constants/Styles'
import FastImage from 'react-native-fast-image'

type Props = {
    uri: string
}

export const YourImage = ({uri}: Props) => (
    <FastImage
        style={defaultStyles.image}
        source={{
            uri: uri,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
)