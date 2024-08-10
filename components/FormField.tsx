import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { icons } from '../constants'

interface IFormField {
    title: string;
    value: string;
    handleChangeText: (e: string) => void;
    placeholder: string;
    otherStyles?: string;
}

const FormField: React.FC<IFormField> = ({ title, value, handleChangeText, placeholder, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2  ${otherStyles} `}>
            <Text className="text-base text-green-100 font-pmedium ">{title}</Text>
            <View className="border-black-200 border-2 w-full h-16 px-4 rounded-2xl flex flex-row items-center justify-between focus:border-secondary-200">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base w-full "
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}

                />
                {title === 'Password' &&
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="h-6 w-6 flex items-end justify-end"
                            resizeMode='contain'
                        />

                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default FormField