import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { API_URL } from '../utils';
import type { ProductFilters } from '../interfaces/ProductFilters';

/**
 * Hook personalizado para obtener productos con filtrado
 *
 * Este hook se encarga de:
 * - Realizar peticiones a la API para obtener productos
 * - Aplicar filtros de búsqueda por nombre y categoría
 * - Implementar debounce para evitar llamadas excesivas al API
 *
 * @param {ProductFilters} filters - Criterios de filtrado (búsqueda y categoría)
 * @returns {Product[]} - Array de productos que coinciden con los filtros
 */
export const useProducts = (filters: ProductFilters) => {
  // Estado para almacenar los productos obtenidos del API
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    /**
     * Función asíncrona para obtener productos del servidor
     * Realiza llamadas al API con los filtros especificados
     */
    const fetchProducts = async () => {
      try {
        // Creamos el objeto para los parámetros de consulta
        const queryParams = new URLSearchParams();

        // Usamos name_like para búsqueda parcial en JSON Server
        if (filters.search) {
          queryParams.append('name_like', filters.search);
        }

        // El filtrado por categoría debe coincidir exactamente
        if (filters.category) {
          queryParams.append('category', filters.category);
        }

        // Construimos la URL completa con los parámetros
        const queryString = queryParams.toString();
        const url = `${API_URL}/products${queryString ? `?${queryString}` : ''}`;

        // Realizamos la petición al servidor
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Actualizamos el estado con los datos recibidos
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        // Manejamos y registramos cualquier error que ocurra
        console.error('Failed to fetch products:', error);
      }
    };

    // Implementamos un pequeño retraso (debounce) para evitar demasiadas llamadas al API mientras se escribe
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    // Limpiamos el timeout cuando el componente se desmonta o los filtros cambian
    return () => clearTimeout(timeoutId);
  }, [filters.category, filters.search]); // El efecto se ejecuta cuando cambia la categoría o el término de búsqueda

  // Devolvemos los productos filtrados
  return products;
};
