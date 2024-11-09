export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'seller';
  address?: Address;
  paymentMethods?: PaymentMethod[];
  preferences?: UserPreferences;
  deliveryAddresses?: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  defaultCurrency: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  seller: User;
  rating: number;
  reviews: Review[];
  stock: number;
  createdAt: string;
  deliveryOptions: DeliveryOption[];
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface LiveStream {
  id: string;
  title: string;
  streamer: User;
  thumbnail: string;
  viewers: number;
  startTime: string;
  category: string;
}

export interface RareItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  seller: User;
  auctionEndsAt?: string;
}

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  provider: string;
  tracking?: boolean;
}

export interface Order {
  id: string;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  deliveryOption: DeliveryOption;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
export type DeliveryStatus = 'pending' | 'processing' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';