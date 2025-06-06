import { useEffect, useState } from 'react';
import type { Category } from '../interfaces/Category';
import { API_URL } from '../utils';

/**
 * Hook personalizado para obtener todas las categorías de productos
 *
 * Este hook se encarga de:
 * - Realizar una petición a la API para obtener la lista de categorías disponibles
 * - Almacenar las categorías en el estado para su uso en componentes
 *
 * @returns {Category[]} - Array de categorías obtenidas de la API
 */
export const useCategories = () => {
  // Estado para almacenar las categorías obtenidas del API
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    /**
     * Función asíncrona para obtener categorías del servidor
     */
    const fetchProducts = async () => {
      try {
        // Realizamos la petición al endpoint de categorías
        const response = await fetch(`${API_URL}/categories`);

        // Verificamos si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Actualizamos el estado con las categorías obtenidas
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        // Manejamos y registramos cualquier error que ocurra
        console.error('Failed to fetch products:', error);
      }
    };

    // Ejecutamos la función para obtener las categorías
    fetchProducts();
  }, []); // El efecto se ejecuta solo al montar el componente

  // Devolvemos las categorías obtenidas
  return categories;
};
