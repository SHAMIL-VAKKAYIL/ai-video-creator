import { View, Text, FlatList } from 'react-native'
import React from 'react'
interface ITrending{
    posts: any
}

const Trending: React.FC<ITrending> = ({posts}) => {
  return (
    <FlatList  
    data={posts}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=>(
        <Text className="text-3xl text-white">{item.id}</Text>
    )}
    horizontal
    />
  )
}

export default Trending