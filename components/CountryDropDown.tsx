import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { TextComp } from './TextComp';

import { verticalScale } from '~/utils/font';

const CountryDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/region/africa')
      .then((response) => {
        const westAfricaCountries = response.data
          .filter((country: any) => country.subregion === 'Western Africa')
          .map((country: any) => ({
            label: country.name.common,
            value: country.name.common,
            flag: country.flags.png,
          }));
        setCountries(westAfricaCountries);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    toggleModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => selectCountry(item.value)}
      className="flex flex-row items-center gap-4">
      <View className="h-8 w-8 overflow-hidden rounded-full">
        <Image source={{ uri: item.flag }} resizeMode="cover" className="h-full w-full" />
      </View>
      <Text className="font-[dmMedium] text-base capitalize text-black/80">{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="items-left relative flex-1 gap-[10]">
      <TextComp text="Country *" color="#222A35" size={14} family="dmBold" />
      <TouchableOpacity
        onPress={toggleModal}
        activeOpacity={0.5}
        style={{
          height: verticalScale(54),
          paddingHorizontal: verticalScale(16),
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#BEC8D5',
          backgroundColor: 'transparent',
          justifyContent: 'center',
        }}>
        <View className="flex-row items-center justify-between">
          {selectedCountry ? (
            <>
              <Text className="font-[dmSemibold] text-base capitalize text-[#222A35]">
                {selectedCountry}
              </Text>
              <Ionicons name="chevron-down" size={verticalScale(18)} color="#CDD5DF" />
            </>
          ) : (
            <>
              <Text className="font-[dmMedium] text-[#CDD5DF]">Select a country</Text>
              <Ionicons name="chevron-down" size={verticalScale(18)} color="#CDD5DF" />
            </>
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={toggleModal}>
        <TouchableOpacity
          onPress={() => selectedCountry.length > 0 && toggleModal}
          activeOpacity={1}
          className="h-full w-full flex-1 justify-center bg-black/20 p-4">
          <View className="h-[50%] rounded-3xl bg-[#F1F1F1] p-6">
            <Text className="mb-4 font-[dmBold] text-xl">Select a Country</Text>
            <View className="mb-4 border border-gray-200" />
            <FlatList
              data={countries}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.value}
              contentContainerStyle={{
                gap: verticalScale(20),
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CountryDropdown;

{
  /* <TouchableOpacity
onPress={toggleModal}
className="top-[%] m-4 h-[320] items-center justify-center rounded-2xl bg-[#F1F1F1]">
<Animatable.View animation="fadeInDown" duration={500}>
  {loading ? (
    <Text>Loading...</Text>
  ) : (
    <FlatList
      data={countries}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      contentContainerStyle={{ gap: verticalScale(16) }}
    />
  )}
</Animatable.View>
</TouchableOpacity> */
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 16,
//     },
//     dropdown: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       padding: 12,
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 4,
//       width: '80%',
//     },
//     dropdownText: {
//       fontSize: 16,
//       color: '#333',
//     },
//     modalOverlay: {
//       flex: 1,
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalContent: {
//       width: '80%',
//       backgroundColor: 'white',
//       borderRadius: 4,
//       padding: 16,
//       maxHeight: '50%',
//     },
//     item: {
//       paddingVertical: 12,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ccc',
//     },
//     itemText: {
//       fontSize: 16,
//       color: '#333',
//     },
//   });
