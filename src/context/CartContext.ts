import { createContext } from 'react';
import type { CartContext as ICartContext } from '../interfaces/CartContext';

/**
 * Contexto para la gestión del carrito de compras
 *
 * Este contexto proporciona acceso al estado del carrito y sus funciones
 * a los componentes de la aplicación. Se inicializa como undefined y
 * debe ser proporcionado por un CartProvider.
 */
export const CartContext = createContext<ICartContext | undefined>(undefined);
