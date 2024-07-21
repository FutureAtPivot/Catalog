import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'CART';
const WISHLIST_KEY = 'WISHLIST';

export const saveToAsyncStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to Async Storage`, error);
  }
};

export const getFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting ${key} from Async Storage`, error);
  }
};
