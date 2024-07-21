import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Address from '~/components/Address';
import { TextComp } from '~/components/TextComp';

const Checkout = () => {
  const [selectedDeliveryEstimate, setSelectedDeliveryEstimate] = React.useState<
    'instantDelivery' | 'standardDelivery' | null
  >(null);
  const [storedAddress, setStoredAddress] = React.useState([]);

  const [selectDeliveryEstimateError, setSelectDeliveryEstimateError] = React.useState(false);

  const validateAndSave = async () => {
    console.log('Validating and saving data:');
    let isValid = true;

    if (!selectedDeliveryEstimate) {
      setSelectDeliveryEstimateError(true);
      isValid = false;
    } else {
      setSelectDeliveryEstimateError(false);
    }

    if (!isValid) {
      return true;
    }

    const deliveryEstimate = {
      selectedDeliveryEstimate,
    };
    await AsyncStorage.setItem('deliveryEstimate', JSON.stringify(deliveryEstimate));
    router.push('Checkout2');
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const shippingDetails = await AsyncStorage.getItem('shippingDetails');
      if (shippingDetails) {
        setStoredAddress(JSON.parse(shippingDetails));
      }
    };

    fetchAddress();
  }, []);

  console.log('storedAddress', storedAddress);

  return (
    <View className="h-full w-full flex-1 bg-white">
      <View className="px-4">
        <View className="flex flex-row items-center justify-between pb-2 pt-6">
          <Text className="text-base font-medium text-[#445469]">Address</Text>

          {/* To add new Address */}
          <TouchableOpacity activeOpacity={0.5} className="flex flex-row items-center">
            <Entypo name="plus" size={20} color="#3538CD" />
            <Text className="text-base font-medium text-[#3538CD] underline">Add New</Text>
          </TouchableOpacity>
        </View>

        <Address item={storedAddress} />

        <View>
          <View className="gap-1 pb-2 pt-6">
            <Text className="font-[dmSemibold] text-base text-[#445469]">Delivery estimate</Text>

            {!selectedDeliveryEstimate
              ? selectDeliveryEstimateError && (
                  <TextComp
                    text="Please selected a delivery method"
                    color="#F04B4B"
                    size={12}
                    family="dmSemibold"
                  />
                )
              : ''}
          </View>

          <View className="gap-4">
            <TouchableOpacity
              onPress={() => setSelectedDeliveryEstimate('instantDelivery')}
              activeOpacity={0.5}
              style={[
                styles.card,
                selectedDeliveryEstimate === 'instantDelivery'
                  ? styles.activeCard
                  : styles.inactiveCard,
              ]}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={30} color="#11151A" />

              <View className="flex-1">
                <Text className="text-base font-medium capitalize text-[#11151A]">
                  Instant Delivery
                </Text>
                <Text className="text-sm font-medium text-[#667F9D]">30 - 40 Mins</Text>
              </View>
            </TouchableOpacity>

            {/* Standard Delivery */}
            <TouchableOpacity
              onPress={() => setSelectedDeliveryEstimate('standardDelivery')}
              activeOpacity={0.5}
              style={[
                styles.card,
                selectedDeliveryEstimate === 'standardDelivery'
                  ? styles.activeCard
                  : styles.inactiveCard,
              ]}>
              <Feather name="truck" size={24} color="#11151A" />

              <View className="flex-1">
                <Text className="text-base font-medium capitalize text-[#11151A]">
                  Standard Delivery
                </Text>
                <Text className="text-sm font-medium text-[#667F9D]">Same Day</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 w-full flex-1 bg-[#FAFBFC] px-4 pb-10 pt-4">
        <TouchableOpacity
          onPress={validateAndSave}
          activeOpacity={0.7}
          className="flex-1 items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
          <Text className="text-center font-[dmMedium] text-base capitalize text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderRadius: 12,
    padding: 16,
  },
  activeCard: {
    borderColor: '#3538CD',
    borderWidth: 1.1,
  },
  inactiveCard: {
    borderColor: '#CDD5DF',
    borderWidth: 1,
  },
});

export default Checkout;

// flex w-full flex-row items-center justify-between gap-4 rounded-xl border border-[#3538CD] bg-[#EBEEF2] p-4"
