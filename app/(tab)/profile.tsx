import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import CustomButton from '@/components/CustomButton'
import { SignOut } from '@/lib/appwrite'

const Profile = () => {

 
  return (
    <GestureHandlerRootView>

      <SafeAreaView className="bg-primary  h-full px-4  ">
       
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Profile