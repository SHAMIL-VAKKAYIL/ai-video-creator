import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { getAllposts, getLatestPost, searchPosts } from '@/lib/appwrite'
import UseAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'



const Search = () => {

  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = UseAppwrite( ()=> searchPosts(query) )

  

  useEffect(() => {
    refetch()
  }, [query])
  return (
    <GestureHandlerRootView  >
      <SafeAreaView className="bg-primary h-full "  >
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <VideoCard
              video={item} />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 ">
              <View className="pb-5">
                <Text className="font-pmedium text-sm text-gray-100">Search Result</Text>
                <Text className="text-2xl text-white font-psemibold"> {query} </Text>
              </View>
              <SearchInput
                initialQuery={query.toString()}
                placeholder={query.toString()}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subTitle="No videos found for your search query"
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Search