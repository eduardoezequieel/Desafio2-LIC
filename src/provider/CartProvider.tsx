import { useState, type ReactNode } from 'react';
import type { CartWithProduct } from '../interfaces/Cart';
import { getCart } from '../services/actions';
import { CartContext } from '../context/CartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartWithProduct[]>([]);

  const fetchCart = async () => {
    const cart = await getCart();
    setCart(cart);
  };

  const value = {
    cart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
