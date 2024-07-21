import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const CategoryThumbnail = ({
  title,
  onPress,
  isActive,
}: {
  title: string;
  onPress: () => void;
  isActive: boolean;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className="items-center justify-center overflow-hidden rounded-full"
        style={{
          width: responsiveWidth(12),
          height: responsiveWidth(12),
          borderColor: '#202024',
          borderWidth: isActive ? 1.5 : 0,
        }}>
        <Text
          className="font-[dmBold] text-base uppercase"
          style={{ color: isActive ? '#202024' : '#808190' }}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CategoryThumbnail;
