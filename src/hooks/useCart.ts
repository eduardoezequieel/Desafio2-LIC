import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Hook personalizado para acceder al contexto del carrito de compras
 *
 * Este hook proporciona una forma sencilla de acceder al estado y las funciones
 * del carrito de compras desde cualquier componente de la aplicación.
 *
 * Debe utilizarse dentro de componentes que sean descendientes de CartProvider
 * para que el contexto esté disponible.
 *
 * @throws {Error} Si se utiliza fuera del ámbito de un CartProvider
 * @returns {Object} El contexto del carrito con su estado y funciones
 */
export const useCart = () => {
  // Intentamos acceder al contexto del carrito
  const context = useContext(CartContext);

  // Verificamos si el contexto está disponible (el componente está dentro de un CartProvider)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  // Devolvemos el contexto para que el componente pueda utilizarlo
  return context;
};
