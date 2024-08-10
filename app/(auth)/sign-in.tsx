import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '@/components/FormField'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { SignIn, SignOut } from '@/lib/appwrite'


const Signin = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'All fields are required')
    }
    setisSubmitting(true)
      try {
       await SignIn(form.email,form.password)
        // Set it to global state....

        router.replace('/home') 

      } catch (error) {
        Alert.alert('Error',error.message)

      } finally{
        setisSubmitting(false)
      }
  }


  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="bg-primary  h-full px-4 " >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}  >
          <View ClassName="w-full items-center justify-center ">
            <Image
              className="w-[115px] h-[35px]"
              source={images.logo}
              resizeMode='contain'
            />
            <Text className="text-2xl text-white mt-10 font-psemibold">Log in to Aora </Text>
            <FormField
              title='Email'
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles='mt-6'
              keyBoardType='email-address'
              placeholder='Enter your email'
            />
            <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-6'
              placeholder='Enter your password'
            />
            <CustomButton
              title='Sign In'
              containerStyle='mt-6'
              handlePress={submit}
              isLoading={isSubmitting}

            />
             
            <View className="mt-3 flex-row justify-center">
              <Text className="text-white font-pregular">Don't have any account?</Text>
              <Link href='/sign-up' className='text-secondary-200 font-psemibold'>  Sign Up</Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Signin