import { defaultStyles } from '@/constants/Styles'
import FastImage from 'react-native-fast-image'

export const YourImage = () => (
    <FastImage
        style={defaultStyles.image}
        source={{
            uri: 'https://xsgames.co/randomusers/assets/avatars/female/71.jpg',
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    />
)