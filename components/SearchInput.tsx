import { View, Text, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { icons, images } from '../constants'
import { router, usePathname } from 'expo-router';

interface ISearchInput {
   
    placeholder?: string;
   
    initialQuery?: string
}

const SearchInput: React.FC<ISearchInput> = ({ placeholder,initialQuery, ...props }) => {

    const pathname=usePathname()
    const [query, setquery] = useState(initialQuery ||'')
    return (
        <GestureHandlerRootView>

     
            <View className="border-black-200 border-2 w-full h-16 px-4 rounded-2xl flex flex-row items-center justify-between focus:border-secondary-200">
                <TextInput
                    className="flex-1 text-white font-pregular  text-base w-full "
                    value={query}
                    placeholder={placeholder}
                    placeholderTextColor='#CDCDE0'
                    onChangeText={(e)=>setquery(e)}
                    
                    />
               
                    <TouchableOpacity
                        onPress={()=>{
                            if(!query){
                                return Alert.alert('missing query',"please input somthing to search results across database")
                            }
                            if(pathname.startsWith('/search'))router.setParams({query})
                                else router.push(`/search/${query}`)
                        }}
                    >
                        <Image
                            source={icons.search}
                            className="h-5 w-5 flex items-end justify-end"
                            resizeMode='contain'
                            />

                    </TouchableOpacity>
            </View>
       
                            </GestureHandlerRootView>
    )
}

export default SearchInput