import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

interface ICustomButton {
  title: string;
  handlePress: () => void;
  containerStyle?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton :React.FC<ICustomButton> =({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading
}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.8}
    className={`bg-secondary-200 min-h-[60px] justify-center items-center rounded-xl ${containerStyle} 
    ${isLoading ? 'opacity-50':''}`}
    disabled={isLoading}
    >
      <Text className={`text-lg font-psemibold text-primary ${textStyles}` }>{title} </Text>
     </TouchableOpacity>
  )
}

export default CustomButton
