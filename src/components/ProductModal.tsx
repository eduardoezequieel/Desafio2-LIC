import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon, ShoppingCart, Star } from 'lucide-react'; // Iconos de Lucide React
import { Modal } from '../ui/Modal'; // Componente Modal personalizado
import Button from '../ui/Button'; // Componente Button personalizado
import type { Product } from '../interfaces/Product'; // Tipo para productos
import { getCart, addToCart, updateCart } from '../services/actions'; // Servicios para el carrito
import { toast } from 'sonner'; // Notificaciones toast
import { useCart } from '../hooks/useCart';

/**
 * Props para el componente de diálogo modal de productos
 * @interface DialogProps
 * @property {boolean} open - Determina si el modal está abierto
 * @property {function} close - Función para cerrar el modal
 * @property {Product | null} selectedProduct - Producto seleccionado para mostrar en el modal
 */
interface DialogProps {
  open: boolean;
  close: () => void;
  selectedProduct: Product | null;
}

/**
 * Componente para mostrar un modal con detalles del producto y opciones para añadirlo al carrito
 * @param {DialogProps} props - Propiedades del componente
 * @returns {JSX.Element | null} - Elemento JSX o null si no hay producto seleccionado
 */
const ProductModal = ({ open, close, selectedProduct }: DialogProps) => {
  // Desestructuramos las propiedades del producto seleccionado o usamos valores vacíos
  const { name, price, stars, description, category, image } = selectedProduct || {};

  // Estado para la cantidad de productos a agregar al carrito
  const [counter, setCounter] = useState(1);

  // Importamos funciones del hook useCart para refrescar el carrito
  const { fetchCart } = useCart();

  // Resetear contador cada vez que se abre el modal
  useEffect(() => {
    if (open) {
      setCounter(1);
    }
  }, [open]);

  /**
   * Incrementa el contador de productos (máximo 99)
   */
  const handleIncrement = () => {
    setCounter((prev) => (prev < 99 ? prev + 1 : 99));
  };

  /**
   * Decrementa el contador de productos (mínimo 1)
   */
  const handleDecrement = () => {
    setCounter((prev) => (prev > 1 ? prev - 1 : 1));
  };
  /**
   * Guarda el producto seleccionado en el carrito
   * Este método es llamado cuando el usuario hace clic en el botón "Agregar"
   * Si el producto ya existe en el carrito, actualiza su cantidad
   * Si no existe, crea una nueva entrada en el carrito
   */
  const handleSave = async (event?: React.MouseEvent) => {
    // Prevenir comportamiento por defecto del evento si existe
    // Esto es crucial para evitar recargas de página causadas por el evento de clic
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // No hacer nada si no hay producto seleccionado
    if (!selectedProduct) return;

    try {
      // Obtener el carrito actual
      const cart = await getCart();

      // Buscar si el producto ya existe en el carrito
      const product = cart.find((item) => item.productId === selectedProduct.id);

      if (product) {
        // Si el producto ya existe, actualizamos su cantidad y precio total
        product.quantity += counter;

        // Actualizamos el producto en el carrito
        await updateCart(product);
        toast.success('Producto actualizado en el carrito correctamente.');
      } else {
        // Si el producto no existe, creamos uno nuevo
        const newItem = {
          id: Date.now().toString(), // Generamos un ID único basado en la fecha actual
          productId: selectedProduct.id,
          quantity: counter,
          price: selectedProduct.price, // Precio del producto
        };

        // Añadimos el nuevo producto al carrito
        await addToCart(newItem);
        toast.success('Producto agregado al carrito correctamente.');
      }

      // Refrescamos el carrito para reflejar los cambios
      await fetchCart();

      // Cerramos el modal después de agregar/actualizar el producto
      close();
    } catch (error) {
      // Manejamos cualquier error que ocurra durante el proceso
      console.error('Error updating cart:', error);
    }
  };
  // Si no hay producto seleccionado, no renderizar nada
  if (!selectedProduct) return null;

  return (
    <Modal open={open} close={close}>
      {/* Contenedor de la imagen del producto */}
      <div className="rounded-sm flex h-[280px] flex-col items-center justify-center">
        <img className="w-full rounded-sm h-full object-cover" src={image} alt="" />
      </div>

      {/* Contenedor de información del producto */}
      <div className="flex flex-col gap-1 mt-2">
        {/* Encabezado con nombre y precio */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">{name}</h3>
          <div className="flex items-start">
            <span className="text-primary text-xl sm:text-2xl font-semibold">$</span>
            <h3 className="text-4xl sm:text-5xl text-primary font-bold">{price?.toFixed(2)}</h3>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Sistema de estrellas para calificación */}
          <div className="flex gap-1">
            {Array.from({ length: stars! }, (_, index) => (
              <Star key={index} color="#29323d" fill="#29323d" size={18} />
            ))}
          </div>{' '}
          {/* Descripción del producto */}
          <p className="text-primary/70 font-normal sm:text-base text-sm">{description}</p>
          {/* Categoría del producto */}
          <div className="w-fit py-3">
            <div className="bg-secondary px-2 py-1 rounded-sm flex items-center justify-center">
              <span className="text-white uppercase text-xs font-bold">{category}</span>
            </div>
          </div>
          {/* Controles para ajustar la cantidad */}
          <div className="flex justify-center items-center gap-6 mb-5">
            {/* Botón para decrementar la cantidad */}
            <Button
              type="button"
              onClick={handleDecrement}
              className="!p-2 !min-h-[40px]"
              variant="primary-outline"
            >
              <MinusIcon size={15} />
            </Button>

            {/* Contador actual */}
            <h1 className="text-3xl text-primary">{counter}</h1>

            {/* Botón para incrementar la cantidad */}
            <Button
              type="button"
              onClick={handleIncrement}
              className="!p-2 !min-h-[40px]"
              variant="primary-outline"
            >
              <PlusIcon size={15} />
            </Button>
          </div>
          {/* Botones de acción */}
          <div className="flex justify-center gap-3 sm:gap-7 flex-wrap">
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              onClick={(e) => {
                e.preventDefault(); // Prevenir comportamiento por defecto
                e.stopPropagation(); // Detener propagación de eventos
                close(); // Cerrar el modal
              }}
              type="button"
              variant="primary-outline"
            >
              Cancelar
            </Button>

            {/* Botón para guardar y agregar al carrito */}
            <Button onClick={(e) => handleSave(e)} type="button" icon={<ShoppingCart size={20} />}>
              Agregar ({counter})
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
