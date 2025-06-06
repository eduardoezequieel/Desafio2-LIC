import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProductCard } from './ProductCard';
import ProductModal from './ProductModal';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../interfaces/Product';
import { useCategories } from '../hooks/useCategories';
import type { ProductFilters } from '../interfaces/ProductFilters';

/**
 * Componente contenedor principal para la visualización y filtrado de productos
 *
 * Este componente gestiona:
 * - La visualización de la lista de productos
 * - El filtrado de productos por categoría y búsqueda
 * - La apertura del modal de detalles del producto
 *
 * @returns {JSX.Element} Contenedor con filtros y grid de productos
 */
export const ProductContainer = () => {
  // Estado para manejar los filtros de búsqueda y categoría
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
  });

  // Obtenemos los productos filtrados usando el hook personalizado
  const products = useProducts(filters);

  // Obtenemos las categorías disponibles para el selector
  const categories = useCategories();

  // Estados para controlar la apertura/cierre del modal y el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Maneja la apertura del modal de detalles del producto
   * @param {Product} product - El producto seleccionado para mostrar en el modal
   */
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  /**
   * Maneja el cierre del modal y limpia el producto seleccionado
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Modal para mostrar detalles del producto seleccionado */}
      <ProductModal selectedProduct={selectedProduct} open={isModalOpen} close={handleCloseModal} />

      {/* Sección de filtros y título */}
      <div className="flex container mx-auto justify-between items-center p-4 px-6 flex-col sm:flex-row gap-4">
        {/* Título que muestra la categoría seleccionada */}
        <h3 className="text-xl font-bold text-primary">
          Productos de la categoria:{' '}
          <span className="font-normal">
            {filters.category === '' ? 'Todos' : filters.category}
          </span>
        </h3>

        {/* Controles de filtrado: búsqueda y selector de categoría */}
        <div className="flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
          {/* Campo de búsqueda con icono */}
          <Input
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            icon={<Search color="#c3ced9" size={18} />}
          />

          {/* Selector desplegable de categorías */}
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
          />
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-b-2 border-[#EEF1F5] mb-10"></div>

      {/* Cuadrícula de productos con diseño responsive */}
      <div className="grid pb-24 min-h-[500px] container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-6 lg:px-6">
        {/* Mapeo de los productos filtrados a tarjetas individuales */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} openModal={handleOpenModal} />
        ))}

        {/* Mensaje cuando no hay productos que coincidan con los filtros */}
        {products.length === 0 && (
          <div className="col-span-full text-center text-primary font-semibold">
            No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
};
