import { View, Text } from 'react-native'
import React from 'react'

interface IInfoBox {
    title: string
    subTitle?: string
    containerStyle?: string
    titleStyle?: string
}

const InfoBox = ({title,subTitle,containerStyle,titleStyle}) => {
    return (
        <View className={containerStyle}>
            <Text className={`text-center  ${titleStyle} `}>{title}</Text>
            <Text className="text-center text-gray-100 font-pregular text-sm">{subTitle}</Text>
        </View>
    )
}

export default InfoBox