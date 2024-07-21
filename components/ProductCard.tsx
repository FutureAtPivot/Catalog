import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useProductStore } from '~/store/Product';
import { formatPrice } from '~/utils/formatPrice';
import { truncate } from '~/utils/truncate';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  current_price: { NGN: number[] }[];
}

interface ProdItemProps {
  item: ProductProps;
  onAddToCheckout: (item: ProductProps) => void;
}

const ProductCard: React.FC<ProdItemProps> = ({ item, onAddToCheckout }) => {
  const addToCart = useProductStore((state) => state.addToCart);

  // Handle Navigation to product detail
  const handleProductDetails = () => {
    onAddToCheckout(item);
    router.navigate({
      pathname: '/ProductDetail',
      params: { product_data: JSON.stringify(item) },
    });
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <View
      key={item?.id}
      style={{
        borderRadius: 8,
        flex: 1,
      }}>
      {/* Product Image */}
      <View>
        <View
          style={{
            width: '100%',
            height: 212,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <TouchableOpacity
            className="h-full w-full"
            activeOpacity={0.8}
            onPress={handleProductDetails}>
            <Image
              className="h-full w-full"
              resizeMode="cover"
              source={{
                uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
              }}
            />
          </TouchableOpacity>

          <View className="absolute bottom-0 w-full p-3">
            <View className="relative flex-row items-center rounded-xl bg-white p-3">
              <View>
                <Text className="font-[dmSemibold] text-sm capitalize text-[#11151A]">
                  {truncate(item?.name, 15)}
                </Text>
                <Text className="font-[dmBold] text-base text-[#11151A]">
                  {formatPrice(item?.current_price?.[0]?.NGN?.[0])}
                </Text>
              </View>

              {/* BTN */}
              {/* <TouchableOpacity
                onPress={() => handleAddToCart(item)}
                activeOpacity={0.7}
                className="absolute right-1 w-fit rounded-full bg-[#3538CD] p-2">
                <Entypo name="plus" size={22} color="#F1F2F3" />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
