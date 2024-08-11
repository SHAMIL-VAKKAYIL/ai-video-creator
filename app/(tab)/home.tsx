import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { getAllposts } from '@/lib/appwrite'
import UseAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'



const Home = () => {

const { data : posts, refetch } =UseAppwrite(getAllposts)


console.log(posts);


  const [refreshing, setrefreshing] = useState(false)



  const onRefresh = async()=>{
    setrefreshing(true)
    // re call datas -> if new videos are available
    await refetch()
    setrefreshing(false)
  }
  return (
    <GestureHandlerRootView>

    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <VideoCard
          video={item} />
        )}
        
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl text-white font-psemibold">Showco</Text>
              </View>
              <View className="mt-1.5">
                <Image
                className="h-12 w-12"
                source={images.logoSmall}
                resizeMode='contain'
                />
              </View>

            </View>
            <SearchInput 
            placeholder="Search for a video topic" 
            
            />


            <View className="flex-1 w-full mt-5 pb-10">
              <Text className="text-gray-100 font-pregular text-lg mb-3">Latest Video</Text>
              <Trending 
              posts ={[{id:1,},{id:2,},{id:3,}] ?? []}
              
              />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
          title="No Videos Found"
          subTitle="Be the first to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />}
        />
    </SafeAreaView>
        </GestureHandlerRootView>
  )
}

export default Home