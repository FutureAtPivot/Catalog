import { Ionicons } from '@expo/vector-icons';
import '../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import 'react-native-reanimated';
import { useProductStore } from '~/store/Product';
import { moderateScale } from '~/utils/font';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    dmLight: require('../assets/fonts/DMSans-Light.ttf'),
    dmRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    dmMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    dmSemibold: require('../assets/fonts/DMSans-SemiBold.ttf'),
    dmBold: require('../assets/fonts/DMSans-Bold.ttf'),

    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const loadCartFromStorage = useProductStore((state) => state.loadCartFromStorage);
  const loadWishlistFromStorage = useProductStore((state) => state.loadWishlistFromStorage);

  useEffect(() => {
    loadCartFromStorage();
    loadWishlistFromStorage();
  }, []);

  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Product Description',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/Message')}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ShippingDetails"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Shipping Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Checkout"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Checkout',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Checkout2"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Checkout',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="OrderSummary"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Order Summary',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Cart"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Shopping Cart',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('Message')}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Message"
        options={{
          headerStyle: { backgroundColor: 'white' },
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'dmSemibold', fontSize: moderateScale(18) },
          headerTitle: 'Your Chats',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
