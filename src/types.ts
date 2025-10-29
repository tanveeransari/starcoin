export type Product = {
  id: number;
  name: string;
  // coins: number;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discount?: number;
  popular?: boolean;
};

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export const SHIPPING_COST = 8.99;
export const TAX_RATE = 0.08;
