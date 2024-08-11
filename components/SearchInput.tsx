import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { icons, images } from '../constants'

interface ISearchInput {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    placeholder: string;
    otherStyles?: string;
}

const SearchInput: React.FC<ISearchInput> = ({ title, value, handleChangeText, placeholder, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <GestureHandlerRootView>

     
            <View className="border-black-200 border-2 w-full h-16 px-4 rounded-2xl flex flex-row items-center justify-between focus:border-secondary-200">
                <TextInput
                    className="flex-1 text-white font-pregular  text-base w-full "
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    
                    />
               
                    <TouchableOpacity >
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