import { createContext } from 'react';
import type { CartContext as ICartContext } from '../interfaces/CartContext';

export const CartContext = createContext<ICartContext | undefined>(undefined);
