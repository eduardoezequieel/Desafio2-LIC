import type { Cart, CartWithProduct } from '../interfaces/Cart';
import { API_URL } from '../utils';

/**
 * Obtiene todos los elementos del carrito con información completa de productos
 * Utiliza el parámetro _expand de JSON Server para incluir los detalles del producto
 * relacionado con cada elemento del carrito
 *
 * @returns {Promise<CartWithProduct[]>} Elementos del carrito con detalles completos de productos
 */
export const getCart = async (): Promise<CartWithProduct[]> => {
  try {
    // Usamos _expand=product para obtener los detalles completos del producto asociado
    // JSON Server buscará en la colección "products" usando el productId como clave foránea
    const response = await fetch(`${API_URL}/cart?_expand=product`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return [];
  }
};

/**
 * Añade un nuevo elemento al carrito de compras
 *
 * @param {Cart} cart - Objeto con la información del producto a añadir al carrito
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 */
export const addToCart = async (cart: Cart): Promise<void> => {
  try {
    // Realizamos una petición POST para añadir el producto al carrito
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicamos que enviamos JSON
      },
      body: JSON.stringify(cart), // Convertimos el objeto a JSON
    });

    // Verificamos si la petición fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Procesamos la respuesta
    await response.json();
  } catch (error) {
    // Manejamos cualquier error que ocurra
    console.error('Failed to update cart:', error);
  }
};

/**
 * Actualiza un elemento existente en el carrito de compras
 *
 * @param {Cart} cart - Objeto con la información actualizada del elemento del carrito
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa la operación
 */
export const updateCart = async (cart: Cart): Promise<void> => {
  try {
    // Realizamos una petición PUT para actualizar el producto en el carrito
    // Se usa el ID del elemento para identificar qué producto actualizar
    const response = await fetch(`${API_URL}/cart/${cart.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Indicamos que enviamos JSON
      },
      body: JSON.stringify(cart), // Convertimos el objeto actualizado a JSON
    });

    // Verificamos si la petición fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Procesamos la respuesta
    await response.json();
  } catch (error) {
    // Manejamos cualquier error que ocurra
    console.error('Failed to update cart:', error);
  }
};

/**
 * Vacía completamente el carrito de compras eliminando todos los elementos
 *
 * @param {CartWithProduct[]} cart - Array de elementos del carrito a eliminar
 * @returns {Promise<boolean>} - Promesa que se resuelve a true si todos los elementos
 * fueron eliminados correctamente, false en caso contrario
 */
export const clearCart = async (cart: CartWithProduct[]): Promise<boolean> => {
  // Extraemos solo los IDs de los productos en el carrito
  const cartIds = cart.map((item) => item.id);

  // Realizamos peticiones DELETE en paralelo para todos los elementos
  return await Promise.all(
    cartIds.map((id) =>
      fetch(`${API_URL}/cart/${id}`, {
        method: 'DELETE',
      })
    )
  )
    .then((responses) => {
      // Verificamos si todas las respuestas fueron exitosas
      const allSuccessful = responses.every((response) => response.ok);
      if (!allSuccessful) {
        throw new Error('Some items could not be removed from the cart');
      }
      return true;
    })
    .catch((error) => {
      console.error('Failed to clear cart:', error);
      return false;
    });
};

/**
 * Elimina un elemento del carrito de compras
 * @param id El identificador del elemento a eliminar
 * @returns {Promise<boolean>} Una promesa que resuelve a true si se eliminó correctamente
 */
export const removeFromCart = async (id: string): Promise<boolean> => {
  try {
    // Realizamos una petición DELETE para eliminar el producto del carrito
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: 'DELETE',
    });

    // Verificamos si la petición fue exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Devolvemos true para indicar que se eliminó correctamente
    return true;
  } catch (error) {
    // Manejamos cualquier error que ocurra
    console.error('Failed to remove from cart:', error);
    // Devolvemos false para indicar que ocurrió un error
    return false;
  }
};
