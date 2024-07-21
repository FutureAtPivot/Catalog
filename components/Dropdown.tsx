import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const Dropdown = ({ label, description }: { label: string; description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (expanded) {
      Animated.timing(animationController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  const arrowAngle = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const dropdownHeight = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={toggleDropdown}
        className="mb-1 flex-row items-center justify-between">
        <Text className="font-{dmBold} text-base text-[#11151A]">{label}</Text>

        <Animated.View style={{ transform: [{ rotate: arrowAngle }] }}>
          <Ionicons name="chevron-down" size={16} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        scrollEnabled={expanded}
        contentInset={{ bottom: 16 }}
        bounces
        decelerationRate={0}
        keyboardDismissMode="on-drag"
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
        className="overflow-hidden rounded-xl bg-[#f3f3f3]"
        style={{ height: dropdownHeight }}>
        <Text className="p-3.5 font-[dmRegular] text-sm">{description}</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default Dropdown;
