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

export const ProductContainer = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
  });
  const products = useProducts(filters);
  const categories = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductModal selectedProduct={selectedProduct} open={isModalOpen} close={handleCloseModal} />
      <div className="flex container mx-auto justify-between items-center p-4 px-6 flex-col sm:flex-row gap-4">
        <h3 className="text-xl font-bold text-primary">
          Productos de la categoria:{' '}
          <span className="font-normal">
            {filters.category === '' ? 'Todos' : filters.category}
          </span>
        </h3>
        <div className="flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
          <Input
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            icon={<Search color="#c3ced9" size={18} />}
          />
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
      <div className="border-b-2 border-[#EEF1F5] mb-10"></div>
      <div className="grid pb-24 min-h-[500px] container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-6 lg:px-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} openModal={handleOpenModal} />
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-primary font-semibold">
            No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
};
