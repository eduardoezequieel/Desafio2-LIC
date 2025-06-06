import type { CartWithProduct } from './Cart';

/**
 * Interfaz que define la estructura y funcionalidades del contexto del carrito
 *
 * @interface CartContext
 * @property {CartWithProduct[]} cart - Array con los elementos del carrito y sus datos de producto relacionados
 * @property {function} fetchCart - Función para actualizar los datos del carrito desde el servidor
 */
export interface CartContext {
  cart: CartWithProduct[];
  fetchCart: () => Promise<void>;
}
