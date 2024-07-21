import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SummaryCardProps {
  subject: string;
  label: string;
  details: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ subject, label, details }) => {
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <View className="flex-1 flex-row items-center gap-4">
        <View className="flex-1 flex-row gap-7">
          <Text className="font-[dmBold] text-base capitalize text-[#11151A]">{label}</Text>
          <View className=" flex-1">
            <Text className="font-[dmMedium] capitalize text-[#445469]">{subject}</Text>
            <Text className="text-sm capitalize text-[#667F9D]" numberOfLines={2}>
              {details}
            </Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" color="#222A3590" size={20} />
      </View>
      <View className="my-4 border border-[#EBEEF2]" />
    </TouchableOpacity>
  );
};

export default SummaryCard;
