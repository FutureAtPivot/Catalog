import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import { useProductStore } from '~/store/Product';
import { formatPrice } from '~/utils/formatPrice';
import { truncate } from '~/utils/truncate';

const CartCard = ({ item }) => {
  // Handle Navigation to product detail
  const handleProductDetails = () => {
    router.navigate({
      pathname: '/ProductDetail',
      params: { product_data: JSON.stringify(item) },
    });
  };

  // Remove product from cart
  const removeFromCart = useProductStore((state) => state.removeFromCart);

  // increase product quantity
  const increaseQuantity = useProductStore((state) => state.increaseQuantity);

  // Descrease product quantity
  const decreaseQuantity = useProductStore((state) => state.decreaseQuantity);

  // Cart actions
  const cart = useProductStore((state) => state.cart);

  const cartItem = cart.find((product) => product.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

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

      {/* Product Detail */}
      <View className="flex h-full flex-1 flex-row items-center justify-between">
        <View className="flex-1 gap-0.5">
          {/* Product Title */}
          <Text className="font-[dmSemibold] text-sm capitalize text-[#11151A]">
            {truncate(item?.name, 24)}
          </Text>

          {/* Product Company */}
          <View className="flex flex-row gap-4 ">
            <Text className="font-[dmMedium] text-sm capitalize text-[#67778B] ">Off-White</Text>
            <Text className="font-[dmMedium] text-sm uppercase text-[#67778B]">XL</Text>
          </View>

          {/* Product Price*/}
          <Text className="font-[dmBold] text-base text-[#3538CD]">
            {formatPrice(item?.current_price?.[0]?.NGN?.[0])}
          </Text>
        </View>

        {/* Product Price | Quantity | CTA */}
        <View className="items-center justify-between gap-3">
          {/* Add or Remove From Cart */}
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              disabled={quantity <= 1}
              activeOpacity={0.5}
              className="items-center justify-center rounded-xl border  border-[#CDD5DF] p-2">
              <Entypo name="minus" size={16} color="#445469" />
            </TouchableOpacity>

            <Text className="font-[dmBold]">{quantity}</Text>

            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              activeOpacity={0.6}
              className="items-center justify-center rounded-xl border border-[#CDD5DF] p-2"
              disabled={quantity >= (item?.available_quantity || Infinity)}>
              <Entypo name="plus" size={16} color="#445469" />
            </TouchableOpacity>
          </View>

          {/* Delete Item From Cart */}
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            activeOpacity={0.4}
            className="flex flex-row items-center gap-0.5">
            <MaterialIcons name="delete-outline" size={20} color="black" />
            <Text className="font-[dmBold] capitalize underline">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
