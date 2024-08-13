import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '@/constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video, user: { username, avatar } } }) => {

  const [play, setplay] = useState(false)


  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="  items-center flex-row flex-1">
          <View className="w-[46px] border border-secondary-200 justify-center items-center p-0.5 h-[46px]">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full"
              resizeMode='cover'
            />
          </View>
          <View className="justify-center ml-3 gap-y-1">
            <Text className="text-sm font-psemibold  text-white" numberOfLines={1}>{title}</Text>
            <Text className="text-xs font-pregular text-gray-100 " numberOfLines={1}>{username} </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image
          source={icons.menu}
          className="w-4 h-4 "
          resizeMode='contain'	
          />
        </View>
      </View>
      {play ? (
     <Video 
     source={{uri:video}}
     className="w-full h-44 mt-3 rounded-xl bg-white/10"
     resizeMode={ResizeMode.CONTAIN}
     useNativeControls
     shouldPlay
     onPlaybackStatusUpdate={(status)=>{
      if(status.didJustFinish){
        setplay(false)
     }}}
     />
      ) :(
        <TouchableOpacity
         className="w-full rounded-xl mt-3 relative justify-center items-center"
         activeOpacity={0.7}
         onPress={()=>setplay(true)}
         >
          <Image 
          source={{uri:thumbnail}}
          className="w-full h-44 mt-3 rounded-xl"
          resizeMode='cover'
          />
          <Image 
          source={icons.play}
          className="w-10 h-10 absolute"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard