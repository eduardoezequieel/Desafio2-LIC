import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProductCard } from './ProductCard';

export const ProductContainer = () => {
  return (
    <>
      <div className="flex container mx-auto justify-between items-center p-4">
        <h3 className="text-xl font-bold text-primary">
          Productos de la categoria: <span className="font-normal">Embutidos</span>
        </h3>
        <div className="flex gap-4">
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
      <div className="grid container mx-auto grid-cols-3 gap-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </>
  );
};
