import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useState } from 'react';
import { View, Text, TextInputProps, TextInput, TouchableOpacity } from 'react-native';

import { TextComp } from './TextComp';

import { moderateScale, verticalScale } from '~/utils/font';

type InputProps = {
  title: string;
  placeholder: string;
  error: string;
  isPassword?: boolean;
  setStateValue: (text: string) => void;
} & TextInputProps;

export const InputField = forwardRef<TextInput, InputProps>(
  ({ title, placeholder, error, isPassword, setStateValue, ...inputProps }, ref) => {
    // State and Ref
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    // Functions
    const handleTextChanged = (text: string) => {
      setValue(text);
      setStateValue(text); // Use the new text value instead of the current value state
    };

    return (
      <View className="items-left flex-1 gap-[10]">
        <TextComp text={title} color="#222A35" size={14} family="dmBold" />

        <View
          className="relative flex-row items-center gap-2"
          style={{
            height: verticalScale(54),
            paddingHorizontal: verticalScale(16),
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#BEC8D5',
            backgroundColor: 'transparent',
          }}>
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor="#CDD5DF"
            {...inputProps}
            value={value}
            onChangeText={handleTextChanged}
            secureTextEntry={isPassword && showPassword}
            className="flex-1 py-3"
          />

          {isPassword && (
            <TouchableOpacity className="p-1" onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={`${showPassword ? 'eye' : 'eye-off'}`}
                size={moderateScale(22)}
                color="#262C5566"
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <TextComp text={error} color="#F04B4B" size={12} family="dmSemibold" />}
      </View>
    );
  }
);
