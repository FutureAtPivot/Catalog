import { router } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';

import CartCard from '~/components/CartCard';
import { useProductStore } from '~/store/Product';

// Cart actions
const Cart = () => {
  const cart = useProductStore((state) => state.cart);

  // Calculate total price
  const calculateTotal = useProductStore((state) => state.calculateTotal);

  const handleCheckout = () => {
    // Navigate to Shipping Address
    router.push('ShippingDetails');
  };
  return (
    <View className="h-full w-full flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="relative flex-1">
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartCard item={item} />}
          contentContainerStyle={{ paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="my-6 border border-[#EBEEF2]" />}
          ListEmptyComponent={() => (
            <View className="h-full w-full flex-1 items-center justify-center bg-white">
              <Text className="font-[dmBold text-base">
                Your cart is empty, add product to continue
              </Text>
            </View>
          )}
        />

        {cart.length > 0 && (
          <View className="absolute bottom-0 w-full flex-1 bg-white px-4 pb-10 pt-4">
            {/* Total Cart */}
            <View className="flex-row items-center justify-between gap-12">
              <View>
                <Text className="font-[dmBold] text-base capitalize">Cart Total</Text>
                <Text className="font-[dmBold] text-xl text-[#3538CD]">{calculateTotal()}</Text>
              </View>

              <TouchableOpacity
                onPress={handleCheckout}
                activeOpacity={0.7}
                className="flex-1 items-center justify-center rounded-lg bg-[#3538CD] py-[14]">
                <Text className="font-[dmBold] text-base capitalize text-white">Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Cart;
