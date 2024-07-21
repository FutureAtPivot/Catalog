import { Entypo, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Dropdown from '~/components/Dropdown';
import ProductItem from '~/components/ProductCard';
import Sizes from '~/components/Sizes';
import { useProductStore } from '~/store/Product';
import { moderateScale } from '~/utils/font';
// import ProductQuantity from '~/components/ProductQuantity';
import { formatDate } from '~/utils/formatDate';
import { formatPrice } from '~/utils/formatPrice';
import { truncate } from '~/utils/truncate';

interface sizeDataProps {
  id: number;
  size: string;
}

const data = [
  { id: 1, size: 'XS' },
  { id: 2, size: 'S' },
  { id: 3, size: 'M' },
  { id: 4, size: 'L' },
  { id: 5, size: 'XL' },
];

const ProductDetail = () => {
  // Using Local Search Params to get Product Details
  const { product_data } = useLocalSearchParams();
  const item = JSON.parse(product_data as string);

  // Setting Active Size
  const [activeSize, setActiveSize] = useState('M');
  const handlePress = (item: sizeDataProps) => {
    if (activeSize === item.size) {
      setActiveSize('');
    } else {
      setActiveSize(item.size);
    }
  };

  const addToCart = useProductStore((state) => state.addToCart);
  const cart = useProductStore((state) => state.cart);
  const wishlist = useProductStore((state) => state.wishlist);
  const toggleWishlist = useProductStore((state) => state.toggleWishlist);

  // Check if the product is already in the cart
  const isProductInCart = cart.some((product) => product.id === item.id);

  // Check if the product is already in the wishlist
  const isProductInWishlist = wishlist.some((product) => product.id === item.id);

  const handleAddToCart = (product: any) => {
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  const handleToggleWishlist = (product: any) => {
    toggleWishlist(product);
  };

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, position: 'relative' }}>
        {/* Product Image */}
        <View
          className="relative m-4 bg-gray-300"
          style={{
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 24,
            height: 360,
          }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            source={{
              uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
            }}
          />

          <TouchableOpacity
            onPress={() => handleToggleWishlist(item)}
            activeOpacity={0.6}
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${isProductInWishlist ? 'bg-red-500' : 'bg-white'}`}>
            <Ionicons
              name="heart-outline"
              color={isProductInWishlist ? 'white' : 'black'}
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View className="px-4">
          <Text className="mb-2 max-w-[85%] font-[dmSemibold] text-lg capitalize text-[#11151A]">
            {item.name as string}
          </Text>

          {/* Color */}
          <Text className="font-[dmSemibold] text-sm font-medium capitalize text-[#9BABBF]">
            Forest Green
          </Text>

          {/* Size */}
          <View className="mb-4 mt-2 flex-row items-center gap-5">
            <Text className="font-[dmBold] text-base text-[#202024]">Size:</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((size, index) => (
                <Sizes
                  key={index}
                  title={size.size}
                  onPress={() => handlePress(size)}
                  isActive={activeSize === size.size}
                />
              ))}
            </ScrollView>
          </View>

          {/* Product Overview */}
          <Dropdown label="Product Overview" description={item.description as string} />
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full flex-1 bg-[#FAFBFC] px-4 pb-10 pt-4">
        {/* Total Cart */}
        <View className="w-full flex-1 flex-row items-center justify-between gap-4">
          <View>
            <Text className="font-[dmBold] text-[#3538CD]" style={{ fontSize: moderateScale(20) }}>
              {formatPrice(item?.current_price?.[0]?.NGN?.[0])}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            disabled={isProductInCart}
            activeOpacity={0.7}
            className={`items-center justify-center rounded-lg ${isProductInCart ? 'bg-red-400' : 'bg-[#3538CD]'} px-[24] py-[12]`}>
            <Text className="font-[dmMedium] text-base capitalize text-white">
              {isProductInCart ? 'Added to cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

// {/* <View
// style={{
//   flex: 1,
//   backgroundColor: 'white',
//   width: '100%',
//   paddingTop: 40,
// }}>
// <View
//   style={{
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   }}>
// {/* Product Name */}
// <Text
//   style={{
//     color: '#202024',
//     fontSize: 18,
//     fontWeight: '500',
//     textTransform: 'capitalize',
//   }}>
//   {item.name as string}
// </Text>

// {item.is_available ? (
//   <Text className="text-base font-medium capitalize text-[#3538CD]">In Stock</Text>
// ) : (
//   <Text>Out of Stock</Text>
// )}
// </View>
// {/* Product Description */}
// <ScrollView style={{ paddingHorizontal: 16, backgroundColor: 'red' }}>
//   <View>
// {item?.description?.length > 0 ? (
//   <Text
//     style={{
//       color: '#5F606D',
//       fontWeight: '300',
//       fontSize: 14,
//       lineHeight: 23,
//       // textAlign: 'justify',
//       width: '99%',
//     }}>
//     {item?.description}
//   </Text>
// ) : (
//   <Text className="text-md text-gray-400">No description available</Text>
// )}
//   </View>

//   {/* cta btn */}
{
  /* <TouchableOpacity
  onPress={() => null}
  activeOpacity={0.7}
  className="w-full rounded-full"
  style={{
    backgroundColor: '#3538CD',
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'absolute',
  }}>
  <Text
    style={{
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'capitalize',
      textAlign: 'center',
    }}>
    Add to cart
  </Text>
</TouchableOpacity> */
}
// </ScrollView>
// </View> */}

{
  /* <Text style={{ color: 'white', fontSize: 24, marginLeft: 16, fontWeight: '400' }}>
${item.current_price[0].NGN}
</Text> */
}

// <Text className="py-8 capitalize text-white">
// created on ${formatDate(item.date_created)}
// </Text>

// newest
//  {/* Product Details */}
//  <ScrollView className=" flex-1 px-4 py-8">
//  <View className="gap-5">
//    {/* Product Name | Availability */}
//  <View className="flex- flex-row items-center justify-between">
//    <Text className="text-lg font-medium capitalize text-[#202024]">
//      {truncate(item.name as string, 25)}
//    </Text>

//      {item.is_available ? (
//        <Text className="text-base font-normal capitalize text-[#3538CD]">In Stock</Text>
//      ) : (
//        <Text>Out of Stock</Text>
//      )}
//    </View>

//    {/* Discount Price | Product Price */}
//    <View className="flex-row items-center gap-5">
//      <Text className="text-base font-medium text-[#808190] line-through">N 4, 800</Text>
//      <Text className="text-base font-medium text-[#3538CD]">
//        ${item.current_price[0].NGN}
//      </Text>
//    </View>

//    {/* Product Description */}
//    <View>
//      {item?.description?.length > 0 ? (
//        <Text className="font-normal leading-7 text-[#5F606D]">{item?.description}</Text>
//      ) : (
//        <Text className="text-md text-gray-400">No description available</Text>
//      )}
//    </View>

//    {/* Product Quantity */}
//    <View className="py-4">{/* <ProductQuantity /> */}</View>

//    {/* Product Category */}
//    <View className="flex-row items-center gap-4">
//      <Text className="text-lg text-[#808190]">Category:</Text>
//      <Text className="text-base font-medium capitalize">Tote Bags</Text>
//    </View>

//    {/* Related Product */}
//    <View className="mb-8 w-full flex-1">
//      <Text className="py-4 text-lg font-medium capitalize text-[#202024]">
//        Related products
//      </Text>

//      {/* <ScrollView horizontal contentContainerStyle={{ flex: 1 }}>
//        {data.map((item, index) => (
//          <ProductItem
//            key={index}
//            item={{ id: 1, name: 'Tote Bags', price: 2000 }}
//            onAddToCheckout={() => null}
//          />
//        ))}
//      </ScrollView> */}
//    </View>
//  </View>
// </ScrollView>

// {/* Add to Cart */}
// <View className="w-full items-center px-5">
//  <TouchableOpacity
//    onPress={handleAddToCart}
//    activeOpacity={0.7}
//    className="absolute bottom-1 w-full items-center rounded-full bg-[#3538CD] px-[10] py-[14] shadow-xl">
//    <Text
//      className="text-center text-base font-medium capitalize text-white"
//      style={{
//        color: 'white',
//        fontSize: 14,
//        fontWeight: '500',
//        textTransform: 'capitalize',
//        textAlign: 'center',
//      }}>
//      Add to cart
//    </Text>
//  </TouchableOpacity>
// </View>
