import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';

import success from '~/assets/success.png';
import Dropdown from '~/components/Dropdown';
import SummaryCard from '~/components/SummaryCard';
import { useProductStore } from '~/store/Product';
const SuccessImage = Image.resolveAssetSource(success).uri;

const OrderSummary = () => {
  const [shippingDetails, setShippingDetails] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const cart = useProductStore((state) => state.cart);

  const handleContinueShopping = () => {
    toggleModal();
    router.navigate('/');
    // cart.clearCart();
  };

  useEffect(() => {
    const fetchShippingDetails = async () => {
      const shippingDetails = await AsyncStorage.getItem('shippingDetails');
      const billingDetails = await AsyncStorage.getItem('billingDetails');
      const deliveryEstimate = await AsyncStorage.getItem('deliveryEstimate');
      if (shippingDetails && billingDetails && deliveryEstimate) {
        setShippingDetails(JSON.parse(shippingDetails));
        setBillingDetails(JSON.parse(billingDetails));
        setDeliveryEstimate(JSON.parse(deliveryEstimate));
      }
    };

    fetchShippingDetails();
  }, []);

  // Calculate total price
  const calculateTotal = useProductStore((state) => state.calculateTotal);

  return (
    <View className="h-full w-full flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-2">
          {/* Location, Address, Postal code */}
          <SummaryCard
            subject={shippingDetails?.city}
            label="Ship To"
            details={shippingDetails?.address}
          />

          {/* Delivery Details */}
          <SummaryCard
            subject={`${deliveryEstimate?.selectedDeliveryEstimate === 'instantDelivery' ? 'Instant Delivery' : 'Standard Delivery'}`}
            label="Delivery"
            details="30-40 mins By Mon, June 24"
          />

          {/* Poyment Method */}
          <SummaryCard
            subject={`${billingDetails?.selectedCard === 'creditCard' ? 'Credit Card' : 'Google Pay'}`}
            label="Payment"
            details={billingDetails?.expiryDate}
          />
        </View>

        {/* Items Quantity */}
        <TouchableOpacity activeOpacity={0.6}>
          <View className="my-2 flex-row justify-between">
            <Text className="font-[dmBold] text-base capitalize text-[#11151A]">
              Items ({cart.length})
            </Text>
            <Ionicons name="chevron-forward" color="#222A3590" size={20} />
          </View>
          <View className="my-4 border border-[#EBEEF2]" />
        </TouchableOpacity>

        {/* Subtatal */}
        <View className="my-2">
          <Dropdown label="Subtotal" description="this is it " />
        </View>

        <View className="my-4 border border-[#EBEEF2]" />

        {/* Totol */}
        <View className="flex-row items-center justify-between py-4">
          <Text className="font-[mdBold] text-base text-[#667F9D]">Total</Text>
          <Text className="font-[dmBold] text-xl text-[#3538CD]">{calculateTotal()}</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full flex-1 bg-[#FAFBFC] px-4 pb-10 pt-4">
        <TouchableOpacity
          onPress={() => toggleModal()}
          activeOpacity={0.7}
          className="flex-1 items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
          <Text className="text-center text-base font-medium capitalize text-white">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={toggleModal}>
        <View className="h-full w-full flex-1 justify-center bg-black/30 p-4">
          <View className="h-fit items-center gap-8 rounded-3xl bg-[#F1F1F1] px-6 py-4 pb-8">
            <View className="items-center">
              <View className="mb-2 h-[64] w-[64] overflow-hidden rounded-full bg-blue-300 p-5">
                <Image
                  source={{ uri: SuccessImage }}
                  resizeMode="contain"
                  className="h-full w-full"
                />
              </View>
              <View className="items-center gap-1">
                <Text className="font-[dmBold] text-base text-[#11151A]">
                  Thanks for your order!
                </Text>
                <Text className="max-w-[80%] text-center text-sm text-[#667F9D]">
                  Your has been saved @{shippingDetails?.fullName}, it'll be shipped to{' '}
                  {shippingDetails?.address}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleContinueShopping}
              activeOpacity={0.7}
              className="w-full items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
              <Text className="text-center text-base font-medium capitalize text-white">
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OrderSummary;
