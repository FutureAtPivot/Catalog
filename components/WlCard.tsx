import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useProductStore } from '~/store/Product';
import { formatPrice } from '~/utils/formatPrice';

const WlCard = ({ item }) => {
  // Handle Navigation to product detail
  const handleProductDetails = () => {
    router.navigate({
      pathname: '/ProductDetail',
      params: { product_data: JSON.stringify(item) },
    });
  };

  const addToCart = useProductStore((state) => state.addToCart);
  const cart = useProductStore((state) => state.cart);

  // Check if the product is already in the cart
  const isProductInCart = cart.some((product) => product.id === item.id);

  const handleAddToCart = (product: any) => {
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleProductDetails}
      activeOpacity={0.8}
      className="flex w-full flex-row items-center gap-3 overflow-hidden px-4">
      {/* image */}
      <View className="h-20 w-[56] overflow-hidden rounded-lg bg-gray-300">
        <Image
          className="h-full w-full"
          resizeMode="cover"
          source={{
            uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
          }}
        />
      </View>

      <View className="flex h-full flex-1 flex-row items-center justify-between gap-3">
        <View className="flex-1 gap-0.5">
          {/* Product Title */}
          <Text className="font-[dmSemibold] text-sm capitalize text-[##11151A]">{item?.name}</Text>

          {/* Product Company */}
          <View className="flex flex-row gap-4 ">
            <Text className="text-sm capitalize text-[#67778B] ">Off-White</Text>
          </View>

          {/* Product Price*/}
          <Text className="font-[dmBold] text-base text-[#3538CD]">
            {formatPrice(item?.current_price?.[0]?.NGN?.[0])}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          disabled={isProductInCart}
          activeOpacity={0.7}
          className={`items-center justify-center rounded-lg ${isProductInCart ? 'bg-red-400' : 'bg-[#3538CD]'} p-2`}>
          <Text className="font-[dmMedium] text-sm capitalize text-white">
            {isProductInCart ? 'Added to cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default WlCard;
