import { Image, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect,router } from 'expo-router';
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';


export default function app() {
const {Loading,Loggedin}=useGlobalContext()

if(!Loading && Loggedin) return <Redirect href='/home'/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full min-h-[85vh] items-center justify-center px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px] "
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full mt-4"
            resizeMode='contain'
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-pbold text-white text-center">
              Discover Endless Possiblities With
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[136px] h-[15px] -right-6 -bottom-1"
              resizeMode='contain'
            />
          </View>
          <Text className=" mt-7 font-pregular text-white text-center ">
            Where creativity meets innovation : embark on a journey of endless possibilities with Aora
          </Text>

          <CustomButton 
            title="Continue With Email"
            handlePress={()=>router.push('/sign-in')}
            containerStyle='w-full mt-7'
            textStyles={null}
            isLoading={false}
          />
        </View>

      </ScrollView>
      <StatusBar
      backgroundColor='#161622'
      style='light'
      />

    </SafeAreaView>
  );
}


