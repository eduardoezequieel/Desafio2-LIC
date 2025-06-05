import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProductCard } from './ProductCard';
import ProductModal from './ProductModal';
import { useState } from 'react';

export const ProductContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ProductModal open={isModalOpen} close={handleCloseModal} />
      <div className="flex container mx-auto justify-between items-center p-4 flex-col sm:flex-row gap-4">
        <h3 className="text-xl font-bold text-primary">
          Productos de la categoria: <span className="font-normal">Embutidos</span>
        </h3>
        <div className="flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
          <Input icon={<Search color="#c3ced9" size={18} />} />
          <Select
            options={[
              {
                label: 'Ordenar porasdsada',
                value: 'default',
              },
            ]}
          />
        </div>
      </div>
      <div className="border-b-2 border-[#EEF1F5] mb-10"></div>
      <div className="grid pb-24 container mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 md:px-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCard key={index} openModal={handleOpenModal} />
        ))}
      </div>
    </>
  );
};
