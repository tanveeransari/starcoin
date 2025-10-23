
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
}