import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { API_URL } from '../utils';
import type { ProductFilters } from '../interfaces/ProductFilters';

export const useProducts = (filters: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();

        // Use name_like for partial name matching in JSON Server
        if (filters.search) {
          queryParams.append('name_like', filters.search);
        }

        // Category filtering needs to match exactly
        if (filters.category) {
          queryParams.append('category', filters.category);
        }

        const queryString = queryParams.toString();
        const url = `${API_URL}/products${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    // Add a small delay to prevent too many API calls while typing
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters.category, filters.search]);

  return products;
};
