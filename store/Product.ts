import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { create } from 'zustand';

import { formatPrice } from '~/utils/formatPrice';

const timbuApiKey = process.env.EXPO_PUBLIC_TIMBU_API_KEY;
const timbuAppID = process.env.EXPO_PUBLIC_TIMBU_APP_ID;
const timbuOrganizationID = process.env.EXPO_PUBLIC_TIMBU_ORGANIZATION_ID;

interface CurrentPrice {
  NGN: number[];
}

interface Product {
  id: number;
  name: string;
  current_price: { NGN: number[] }[];
  image: string;
  available_quantity: number;
}

interface CartItem extends Omit<Product, 'current_price'> {
  price: number;
  quantity: number;
}

interface ProductStoreState {
  products: Product[] | null;
  productCount: number | null;
  defaultProductData: Product | null;
  cart: CartItem[];
  wishlist: Product[];
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  calculateTotal: () => string;
  loadCartFromStorage: () => void;
  loadWishlistFromStorage: () => void;
}

const CART_KEY = 'CART';
const WISHLIST_KEY = 'WISHLIST';

const saveToAsyncStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to Async Storage`, error);
  }
};

const getFromAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting ${key} from Async Storage`, error);
  }
};

export const useProductStore = create<ProductStoreState>((set, get) => ({
  products: null,
  productCount: null,
  defaultProductData: null,
  cart: [],
  wishlist: [],
  setProducts: (products: Product[]) => set({ products }),

  //   Add to cart
  addToCart: (product: Product) => {
    const cart = get().cart;
    const products = get().products || [];

    console.log('Adding product to cart:', product);
    console.log('Current cart:', cart);

    const existingProduct = cart.find((item) => item.id === product.id);

    const price = product?.current_price?.[0]?.NGN?.[0];

    if (price === undefined) {
      console.error('Product does not have valid current_price structure:', product);
      return;
    }

    if (!existingProduct) {
      const updatedCart = [...cart, { ...product, price, quantity: 1 }];
      set({
        cart: updatedCart,
        products: products.filter((item) => item.id !== product.id),
      });
      saveToAsyncStorage(CART_KEY, updatedCart);
      console.log('Product added to cart. Updated cart:', get().cart);
    } else {
      if (existingProduct.quantity < product.available_quantity) {
        const updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        set({
          cart: updatedCart,
        });
        saveToAsyncStorage(CART_KEY, updatedCart);
        console.log('Product quantity increased in cart. Updated cart:', get().cart);
      }
    }
  },

  //   Remove from cart
  removeFromCart: (productId: number) => {
    const cart = get().cart;
    const removedProduct = cart.find((product) => product.id === productId) as CartItem | undefined;

    if (removedProduct) {
      const { price, quantity, ...product } = removedProduct; // Extract only the Product properties
      const productWithPrice = { ...product, current_price: [{ NGN: [price] }] }; // Reconstruct product with current_price

      const updatedCart = cart.filter((product) => product.id !== productId);
      const updatedProducts = get().products
        ? [...get().products!, productWithPrice]
        : [productWithPrice];
      set({
        cart: updatedCart,
        products: updatedProducts,
      });
      saveToAsyncStorage(CART_KEY, updatedCart);
      console.log('Product removed from cart. Updated cart:', get().cart);
    }
  },

  //   Toggle wishlist
  toggleWishlist: (product: Product) => {
    const wishlist = get().wishlist;
    let updatedWishlist;
    if (wishlist.find((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    set({ wishlist: updatedWishlist });
    saveToAsyncStorage(WISHLIST_KEY, updatedWishlist);
  },

  //   Increase quantity
  increaseQuantity: (productId: number) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === productId);
    const products = get().products || [];
    if (cartItem && cartItem.quantity < products[0].available_quantity) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({
        cart: updatedCart,
      });
      saveToAsyncStorage(CART_KEY, updatedCart);
    }
  },

  //   Decrease quantity
  decreaseQuantity: (productId: number) => {
    const cart = get().cart;
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    set({
      cart: updatedCart,
    });
    saveToAsyncStorage(CART_KEY, updatedCart);
  },

  calculateTotal: () => {
    const cart = get().cart;
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return formatPrice(total);
  },

  loadCartFromStorage: async () => {
    const cart = await getFromAsyncStorage(CART_KEY);
    if (cart) {
      set({ cart });
    }
  },

  loadWishlistFromStorage: async () => {
    const wishlist = await getFromAsyncStorage(WISHLIST_KEY);
    if (wishlist) {
      set({ wishlist });
    }
  },
}));

export const getAllProducts = async () => {
  const url = `https://api.timbu.cloud/products?organization_id=${timbuOrganizationID}&reverse_sort=false&page=1&size=10&Appid=${timbuAppID}&Apikey=${timbuApiKey}`;
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const cart = useProductStore.getState().cart;
      const products = response.data.items.filter(
        (product: Product) => !cart.find((item) => item.id === product.id)
      );
      useProductStore.setState({ products });
      useProductStore.setState({ productCount: products.length });
      useProductStore.setState({ defaultProductData: products });
      return true;
    }
  } catch (error: any) {
    alert(`There is an error: ${error.response?.data?.message || error.message}`);
  }
};

export const addToCart = async () => {};
