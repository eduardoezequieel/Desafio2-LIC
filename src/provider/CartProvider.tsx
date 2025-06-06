import { useState, type ReactNode } from 'react';
import type { CartWithProduct } from '../interfaces/Cart';
import { getCart } from '../services/actions';
import { CartContext } from '../context/CartContext';

/**
 * Proveedor de contexto para el carrito de compras
 *
 * Este componente:
 * - Mantiene el estado del carrito de compras utilizando React hooks
 * - Proporciona funciones para interactuar con el carrito
 * - Expone estos datos y funciones a través del contexto para que
 *   estén disponibles en toda la aplicación
 *
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * @returns {JSX.Element} Proveedor de contexto con los hijos
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // Estado para almacenar los elementos del carrito con información de productos
  const [cart, setCart] = useState<CartWithProduct[]>([]);

  /**
   * Función para obtener los datos actualizados del carrito desde el servidor
   * Utiliza la función getCart del servicio actions que implementa _expand
   * para incluir información completa de los productos
   */
  const fetchCart = async () => {
    const cart = await getCart();
    setCart(cart);
  };

  // Objeto con los valores que se proporcionarán a través del contexto
  const value = {
    cart,
    fetchCart,
  };

  // Renderiza el proveedor de contexto con los valores y los componentes hijos
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
