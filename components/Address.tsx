import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// interface AddressProps {
//   id: number;
//   location: string;
//   city: string;
//   country: string;
// }

interface ItemProps {
  item: any;
}

const Address: React.FC<ItemProps> = ({ item }) => {
  console.log('item', item);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="flex w-full flex-row items-center justify-between rounded-xl border border-[#3538CD] p-4">
      <View className="gap-0.5">
        <Text className="font-meduim text-base capitalize text-[#11151A]">{item.address}</Text>
        <Text className="text-sm font-normal capitalize text-[#667F9D]">{item.city}</Text>
        <Text className="text-sm font-normal capitalize text-[#667F9D]">{item.country}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.6}>
        <AntDesign name="edit" size={24} color="#3538CD" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default Address;
