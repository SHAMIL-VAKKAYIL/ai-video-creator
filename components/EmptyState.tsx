import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
 
interface IEmptyState {
    title: string;
    subTitle: string;
}
const EmptyState:React.FC<IEmptyState> = ({title,subTitle}) => {
  return (
    <View className="justify-center items-center px-4 ">
        <Image 
        source={images.empty}
        className="w-40 h-40"
        resizeMode='contain'
        />
        <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
        <Text className="text-xl text-white font-psemibold">{subTitle }</Text>

        <CustomButton 
        title='Create video'
        handlePress={()=> router.push('/create')}
        containerStyle=" w-full mt-5"
        />
       
    </View>
  )
}

export default EmptyState