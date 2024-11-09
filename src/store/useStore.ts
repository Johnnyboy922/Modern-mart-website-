import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Product, LiveStream, RareItem } from '../types';

interface StoreState {
  user: User | null;
  cart: { product: Product; quantity: number }[];
  wishlist: Product[];
  recentlyViewed: Product[];
  activeFilters: {
    category: string[];
    priceRange: [number, number];
    rating: number;
  };
  searchQuery: string;
  setUser: (user: User | null) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  addToRecentlyViewed: (product: Product) => void;
  updateFilters: (filters: Partial<StoreState['activeFilters']>) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      activeFilters: {
        category: [],
        priceRange: [0, 1000],
        rating: 0,
      },
      searchQuery: '',
      setUser: (user) => set({ user }),
      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      toggleWishlist: (product) =>
        set((state) => ({
          wishlist: state.wishlist.some((item) => item.id === product.id)
            ? state.wishlist.filter((item) => item.id !== product.id)
            : [...state.wishlist, product],
        })),
      addToRecentlyViewed: (product) =>
        set((state) => ({
          recentlyViewed: [
            product,
            ...state.recentlyViewed.filter((item) => item.id !== product.id),
          ].slice(0, 10),
        })),
      updateFilters: (filters) =>
        set((state) => ({
          activeFilters: { ...state.activeFilters, ...filters },
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'marketplace-store',
    }
  )
);