import type { Product } from './Product';

export interface Cart {
  id: string;
  productId: number;
  price: number;
  quantity: number;
}

export interface CartWithProduct extends Cart {
  product: Product;
}
