import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
const Home = () => {
  return (
    <SafeAreaView className="bg-primary ">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
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
      />
    </SafeAreaView>
  )
}

export default Home