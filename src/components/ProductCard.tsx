import type { Product } from '../interfaces/Product';

/**
 * Props para el componente ProductCard
 * @interface ProductCardProps
 * @property {function} openModal - Función para abrir el modal con el producto seleccionado
 * @property {Product} product - Información del producto a mostrar en la tarjeta
 */
interface ProductCardProps {
  openModal: (selectedProduct: Product) => void;
  product: Product;
}

/**
 * Componente que muestra una tarjeta de producto individual
 * Presenta la información básica del producto y permite abrir un modal con más detalles
 *
 * @param {ProductCardProps} props - Propiedades del componente
 * @returns {JSX.Element} - Elemento JSX que representa la tarjeta del producto
 */
export const ProductCard = ({ openModal, product }: ProductCardProps) => {
  // Desestructuramos las propiedades del producto para facilitar su uso
  const { name, shortDescription, price, category, image } = product;

  return (
    <div className="bg-secondary-background flex flex-col h-full rounded">
      {/* Contenedor de la imagen del producto con tamaño responsivo */}
      <div className="rounded-sm h-[200px] min-[1280px]:h-[350px] flex-shrink-0 pt-4 px-4 pb-1">
        <img className="w-full rounded-sm h-full object-cover" src={image} alt={name} />
      </div>

      <div className="flex flex-col flex-grow justify-between p-4">
        <div className="mb-auto">
          {/* Encabezado con nombre del producto y precio */}
          <div className="flex gap-2 justify-between items-center">
            <div className="py-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary">{name}</h3>
            </div>
            <div className="flex items-start">
              <span className="text-primary text-xl sm:text-2xl font-semibold">$</span>
              <h3 className="text-xl sm:text-4xl text-primary font-bold">{price.toFixed(2)}</h3>
            </div>
          </div>

          {/* Descripción corta del producto */}
          <p className="text-primary/70 font-normal text-sm sm:text-base mt-2">
            {shortDescription}
          </p>
        </div>

        {/* Pie de la tarjeta con categoría y botón de detalles */}
        <div className="flex justify-between items-end mt-4 flex-wrap gap-y-3">
          {/* Etiqueta de categoría */}
          <div className="bg-secondary px-2 py-1 rounded-sm flex items-center justify-center">
            <span className="text-white uppercase text-xs font-bold">{category}</span>
          </div>

          {/* Botón para abrir el modal con detalles del producto */}
          <button
            type="button"
            onClick={() => openModal(product)}
            className="bg-primary cursor-pointer hover:bg-primary/80 transition-all text-xs sm:text-sm text-white px-3 sm:px-4 text-center py-2 uppercase font-bold rounded-md"
            aria-label={`Ver detalles de ${name}`}
          >
            Detalles
          </button>
        </div>
      </div>
    </div>
  );
};
