import { View, Text, FlatList, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import { SignOut, getAllposts, getLatestPost, getUserPost, searchPosts } from '@/lib/appwrite'
import UseAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import InfoBox from '@/components/InfoBox'



const Profile = () => {

  const { setLoggedin, User, setUser, } = useGlobalContext()
  const { data: posts } = UseAppwrite(() => getUserPost(User.$id))

  const logout = async () => {
    await SignOut()
    setLoggedin(false)
    setUser(null)
    router.replace('/sign-in')
  }



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
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  className="w-6 h-6 "
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <View className=" border border-secondary-200 p-0.5 rounded-full items-center justify-center overflow-hidden">
                <Image
                  source={{ uri: User?.avatar }}
                  className="w-20 h-20 rounded-full "
                  resizeMode='contain'
                />
                {/* <Text className="text-white font-psemibold text-xl">{User.username}</Text> */}

              </View>
                <InfoBox
                  title={User?.username}
                  containerStyle="mt-1"
                  titleStyle="text-white font-psemibold text-xl"
                />
                <View className="flex-row w-[13vh] justify-between">

                  <InfoBox
                    className=""
                    title={posts?.length || 0}
                    subTitle="Videos"
                    titleStyle="text-white font-psemibold text-xl "
                  />
                  <InfoBox
                    title="1.4k"
                    subTitle="Views"
                    titleStyle="text-white font-psemibold text-xl"
                  />
                </View>



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

export default Profile