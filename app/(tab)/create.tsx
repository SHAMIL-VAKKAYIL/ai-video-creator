import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import * as ImagePicker from 'expo-image-picker'

const Create = () => {
  const {User} =useGlobalContext()
  const [uploading, setuploading] = useState(false)
  const [form, setform] = useState(({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  }))

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images: ImagePicker.MediaTypeOptions.Videos ,
      aspect: [4, 3],
      quality: 1,
    });
        if(!result.canceled){
          if(selectType === "image"){
            setform({...form,thumbnail:result.assets[0]})
          }
          if(selectType === "video"){
            setform({...form,video:result.assets[0]})
          }
        }
      

  }

  const submit = async()=>{
    if(!form.title || !form.video || !form.thumbnail || !form.prompt){
      return Alert.alert('All fields are required')
    }
    setuploading(true)
    try {
      await createVideo({
        ...form,accountId:User.$id
      })

      Alert.alert('Success','Video uploaded successfully')
      router.push('/home')
      
    } catch (error) {
     Alert.alert('Error',error.message)
    }finally{
      setform({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })
      setuploading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <FormField
          title='video title'
          value={form.title}
          placeholder='Give your video title'
          handleChangeText={(e) => setform({ ...form, title: e })}
          otherStyles='mt-6'
        />
        <View>
          <Text className="text-gray-100 text-base font-pmedium mt-5 ">
            Upload Video
          </Text>
          <TouchableOpacity onPress={()=>openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />

            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-200 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode=' contain'
                    className="h-1/2 w-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity >
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium mt-3">Thumbnail Image</Text>
            <TouchableOpacity onPress={()=>openPicker('image')}>
            {form.thumbnail ? (
              <Video
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode='cover'
                
              />

            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="h-5 w-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
            )}
            </TouchableOpacity>
        </View>
        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeText={(e) => setform({ ...form, prompt: e })}
          otherStyles='mt-6'
        />
        <CustomButton 
          title='submit'
          handlePress={submit}
          containerStyle='mt-6'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create