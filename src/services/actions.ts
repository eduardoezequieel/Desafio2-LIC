import type { Cart } from '../interfaces/Cart';
import { API_URL } from '../utils';

export const getCart = async (): Promise<Cart[]> => {
  try {
    const response = await fetch(`${API_URL}/cart`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return [];
  }
};

export const addToCart = async (cart: Cart): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    console.log('Cart updated successfully');
  } catch (error) {
    console.error('Failed to update cart:', error);
  }
};

export const updateCart = async (cart: Cart): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/cart/${cart.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    await response.json();
    console.log('Cart updated successfully');
  } catch (error) {
    console.error('Failed to update cart:', error);
  }
};
