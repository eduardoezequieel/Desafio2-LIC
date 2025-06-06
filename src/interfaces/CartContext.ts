import type { CartWithProduct } from './Cart';

export interface CartContext {
  cart: CartWithProduct[];
  fetchCart: () => Promise<void>;
}
