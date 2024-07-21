import React from 'react';
import { FlatList, View, Text } from 'react-native';

import WlCard from '~/components/WlCard';
import { useProductStore } from '~/store/Product';

const Favourite = () => {
  const wishlist = useProductStore((state) => state.wishlist);

  return (
    <View className="flex-1 bg-white px-4">
      <FlatList
        data={wishlist}
        renderItem={({ item }) => <WlCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="my-6 border border-[#EBEEF2]" />}
        ListEmptyComponent={<Text>No items in the wishlist.</Text>}
        ListFooterComponent={() => (
          <View className="my-12 flex-row items-center justify-center text-center">
            <Text className="font-[dmSemibold] text-sm">
              You have {wishlist.length} product(s) in your wishlist
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Favourite;
