import { TAX_RATE, SHIPPING_COST } from "./types";

export function calculateCartTotal(
  cartItems: { price: number; quantity: number }[],
  taxRate: number,
  shippingCost: number
): number {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount + shippingCost;
  return totalAmount;
}

export function calculateCartTotals(
  cartItems: { price: number; quantity: number }[]
): [number, number, number, number] {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = subtotal * TAX_RATE;
  const totalAmount = subtotal + taxAmount + SHIPPING_COST;
  return [subtotal, totalAmount, taxAmount, SHIPPING_COST];
}
