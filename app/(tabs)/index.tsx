import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import ProductCard from '~/components/ProductCard';
import { TextComp } from '~/components/TextComp';
import { getAllProducts, useProductStore } from '~/store/Product';
import { horizontalScale, verticalScale } from '~/utils/font';

// const data = [
//   { id: '1', name: 'Product 1', price: 500 },
//   { id: '2', name: 'Product 2', price: 500 },
//   { id: '3', name: 'Product 3', price: 500 },
//   { id: '4', name: 'Product 4', price: 500 },
//   { id: '5', name: 'Product 5', price: 500 },
//   { id: '6', name: 'Product 6', price: 500 },
//   { id: '7', name: 'Product 7', price: 500 },
//   { id: '8', name: 'Product 8', price: 500 },
//   { id: '9', name: 'Product 9', price: 500 },
//   { id: '10', name: 'Product 10', price: 500 },
//   { id: '11', name: 'Product 11', price: 500 },
//   { id: '12', name: 'Product 12', price: 500 },
//   { id: '13', name: 'Product 13', price: 500 },
//   { id: '14', name: 'Product 14', price: 500 },
// ];

export default function Home() {
  const { products } = useProductStore();
  const cart = useProductStore((state) => state.cart);

  // validate Products and State;
  useEffect(() => {
    if (!products) {
      getAllProducts();
    } else {
      console.log('working perfectly, no need to refetch! ');
    }
  }, [products]);

  return (
    <View className="bg-white">
      <Stack.Screen
        options={{
          title: 'Home',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('Cart')}
              className="relative mr-5 flex-1 items-center justify-center">
              <Ionicons name="cart-outline" size={22} color="#11151A" />

              {cart.length > 0 && (
                <View className="absolute -right-2 top-1 h-5 w-5 items-center justify-center rounded-full bg-[#3538CD]">
                  <TextComp color="white" family="dmBold" size={12} text={cart.length} />
                </View>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              marginHorizontal: horizontalScale(4),
              marginBottom: verticalScale(8),
            }}>
            <ProductCard item={item} onAddToCheckout={() => null} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: horizontalScale(16),
          paddingTop: verticalScale(16),
          paddingBottom: verticalScale(32),
          backgroundColor: 'white',
        }}
        ListHeaderComponent={() => (
          <View className="mb-6 flex-row justify-between">
            <TextComp text="Products" size={16} color="#11151A" family="dmSemibold" />

            <TouchableOpacity activeOpacity={0.6} className="flex-row items-center gap-1">
              <TextComp
                text="See more"
                size={14}
                color="#3538CD"
                family="dmSemibold"
                adjustsFontSizeToFit
              />
              <Ionicons name="chevron-forward" size={14} color="#3538CD" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
