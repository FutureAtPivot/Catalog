import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CountryDropdown from '~/components/CountryDropDown';
import { InputField } from '~/components/InputField';

const ShippingDetails = () => {
  const [fullName, setFullName] = useState('');
  // const [country, setCountry] = useState('Nigeria');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [region, setRegion] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const country = 'Nigeria';

  // Error State
  const [fullNameError, setFullNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [regionError, setRegionError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const validateAndSave = async () => {
    console.log('Validating and saving data:');
    let isValid = true;

    if (!fullName) {
      setFullNameError(true);
      isValid = false;
    } else {
      setFullNameError(false);
    }

    if (!country) {
      setCountryError(true);
      isValid = false;
    } else {
      setCountryError(false);
    }

    if (!address) {
      setAddressError(true);
      isValid = false;
    } else {
      setAddressError(false);
    }

    if (!city) {
      setCityError(true);
      isValid = false;
    } else {
      setCityError(false);
    }

    if (!postalCode) {
      setPostalCodeError(true);
      isValid = false;
    } else {
      setPostalCodeError(false);
    }

    if (!region) {
      setRegionError(true);
      isValid = false;
    } else {
      setRegionError(false);
    }

    if (!phoneNumber) {
      setPhoneNumberError(true);
      isValid = false;
    } else {
      setPhoneNumberError(false);
    }

    if (!isValid) {
      return true;
    }

    const shippingDetails = {
      fullName,
      country,
      address,
      city,
      postalCode,
      region,
      phoneNumber,
    };
    await AsyncStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    router.push('Checkout');
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, backgroundColor: 'white' }}>
      <>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            className="flex-1 px-4 pt-10"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets>
            <View className="gap-7 pb-36">
              <InputField
                title="Full Name *"
                placeholder="Enter your full name"
                keyboardType="default"
                setStateValue={setFullName}
                error={fullName ? '' : fullNameError ? 'This field is required' : ''}
                autoCapitalize="words"
              />

              {/* Country */}
              <CountryDropdown />

              {/* Address */}
              <InputField
                title="Address *"
                placeholder="Street Address"
                keyboardType="default"
                setStateValue={setAddress}
                error={address ? '' : addressError ? 'This field is required' : ''}
              />

              {/* City */}
              <InputField
                title="City *"
                placeholder="Port Harcourt"
                keyboardType="default"
                setStateValue={setCity}
                autoCapitalize="words"
                error={city ? '' : cityError ? 'This field is required' : ''}
              />

              {/* Postal Code and Select Region */}
              <View className="flex-row gap-4">
                {/* Post Code */}
                <InputField
                  title="Postal Code *"
                  placeholder="0 1 2 3 4 5"
                  keyboardType="number-pad"
                  setStateValue={setPostalCode}
                  error={postalCode ? '' : postalCodeError ? 'This field is required' : ''}
                />

                {/* Post Code */}
                <InputField
                  title="Region"
                  placeholder="West-africa"
                  keyboardType="default"
                  setStateValue={setRegion}
                  autoCapitalize="words"
                  error={region ? '' : regionError ? 'This field is required' : ''}
                />
              </View>

              <InputField
                title="Phone Number *"
                placeholder="Phone number"
                keyboardType="phone-pad"
                setStateValue={setPhoneNumber}
                error={phoneNumber ? '' : phoneNumberError ? 'This field is required' : ''}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View className="absolute bottom-0 w-full flex-1 bg-[#FAFBFC] px-4 pb-10 pt-4">
          <TouchableOpacity
            onPress={validateAndSave}
            activeOpacity={0.7}
            className="flex-1 items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
            <Text className="text-center font-[dmMedium] text-base capitalize text-white">
              Save and Continue
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar barStyle="dark-content" />
      </>
    </SafeAreaView>
  );
};

export default ShippingDetails;
