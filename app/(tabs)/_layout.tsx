import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { horizontalScale, moderateScale } from '~/utils/font';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3538CD',
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Catalog',
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
          headerLeft: () => {
            return (
              <View
                style={{ height: horizontalScale(26), width: horizontalScale(26), marginLeft: 20 }}>
                <Ionicons name="card-outline" color="#101828" size={24} />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="Favourite"
        options={{
          title: 'Favourite',
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart-outlined" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
