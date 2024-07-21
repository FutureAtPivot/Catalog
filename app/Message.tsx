import React from 'react';
import { View, Text, Image } from 'react-native';

import empty from '~/assets/empty.jpg';

const EmptyPlaceholder = Image.resolveAssetSource(empty).uri;

const Message = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-[dmBold] text-xl">You don't have any recent chats</Text>
    </View>
  );
};

export default Message;
