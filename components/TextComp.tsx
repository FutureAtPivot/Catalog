import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

import { moderateScale } from '~/utils/font';

interface TextCompProps extends TextProps {
  text: string | number;
  color: string;
  size: number;
  family: string;
  style?: StyleProp<TextStyle>;
}

export const TextComp: React.FC<TextCompProps> = ({
  text,
  color,
  size,
  family,
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        {
          color,
          fontSize: moderateScale(size),
          fontFamily: family,
        },
        style,
      ]}
      {...props}>
      {text}
    </Text>
  );
};
