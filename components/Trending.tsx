import { icons } from '@/constants'
import { Video,ResizeMode } from 'expo-av'
import { useState } from 'react'
import { View, Text, FlatList, Touchable, TouchableOpacity, ImageBackground, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface ITrending {
  posts: any
}

const zoomin={
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
}

const zoomout={
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
}
const TrendingItem = ({activeItem,item  }) => {
 
 const [play, setplay] = useState(false)
  return (
    <Animatable.View 
    className="mr-5"
    animation={activeItem === item.$id ? zoomin : zoomout}
    duration={500}
    >
      {play ? (
       <Video 
       source={{uri:"https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
       className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
       resizeMode={ResizeMode.CONTAIN}
       useNativeControls
       shouldPlay
       onPlaybackStatusUpdate={(status)=>{
        if(status.didJustFinish){
          setplay(false)
       }}}
       />
      ) :
      (
        <TouchableOpacity className="relative items-center justify-center"
        activeOpacity={0.7}
        onPress={()=>setplay(true)}
        >
        <ImageBackground 
        source={{uri:item.thumbnail}}
        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 '
        resizeMode='cover'
        />
        <Image 
        source={icons.play} 
        className=" w-10 h-10 absolute"
        resizeMode='contain'/>

        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const Trending: React.FC<ITrending> = ({ posts }) => {


    const [activeItem, setactiveItem] = useState(posts[0])

    const  viewbleItemsChanged = ({viewableItems}) => {
      if(viewableItems.length > 0){
        setactiveItem(viewableItems[0].key)
      }
    }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem  activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewbleItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold:70
      }}
      contentOffset={{x:170}}
      horizontal
    />
  )
}

export default Trending