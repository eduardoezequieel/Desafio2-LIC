import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon, ShoppingCart, Star } from 'lucide-react';
import { Modal } from '../ui/Modal';
import Button from '../ui/Button';
import type { Product } from '../interfaces/Product';
import { getCart, addToCart, updateCart } from '../services/actions';

interface DialogProps {
  open: boolean;
  close: () => void;
  selectedProduct: Product | null;
}

const ProductModal = ({ open, close, selectedProduct }: DialogProps) => {
  const { name, price, stars, description, category, image } = selectedProduct || {};
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (open) {
      setCounter(1);
    }
  }, [open]);

  const handleIncrement = () => {
    setCounter((prev) => (prev < 99 ? prev + 1 : 99));
  };

  const handleDecrement = () => {
    setCounter((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSave = async () => {
    if (!selectedProduct) return;
    const cart = await getCart();

    let product = cart.find((item) => item.productId === selectedProduct?.id);

    if (product) {
      product.quantity += counter;

      updateCart(product)
        .then(() => {
          close();
        })
        .catch((error: unknown) => {
          console.error('Error updating cart:', error);
        });
    } else {
      product = {
        id: Date.now().toString(),
        productId: selectedProduct.id,
        quantity: counter,
        price: selectedProduct.price * counter,
      };

      addToCart(product)
        .then(() => {
          close();
        })
        .catch((error: unknown) => {
          console.error('Error updating cart:', error);
        });
    }
  };

  if (!selectedProduct) return null;

  return (
    <Modal open={open} close={close}>
      <div className="rounded-sm flex h-[280px] flex-col items-center justify-center">
        <img className="w-full rounded-sm h-full object-cover" src={image} alt="" />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">{name}</h3>
          <div className="flex items-start">
            <span className="text-primary text-xl sm:text-2xl font-semibold">$</span>
            <h3 className="text-4xl sm:text-5xl text-primary font-bold">{price?.toFixed(2)}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            {Array.from({ length: stars! }, (_, index) => (
              <Star key={index} color="#29323d" fill="#29323d" size={18} />
            ))}
          </div>
          <p className="text-primary/70 font-normal sm:text-base text-sm">{description}</p>
          <div className="w-fit py-3">
            <div className="bg-secondary px-2 py-1 rounded-sm flex items-center justify-center">
              <span className="text-white uppercase text-xs font-bold">{category}</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 mb-5">
            <Button
              type="button"
              onClick={handleDecrement}
              className="!p-2 !min-h-[40px]"
              variant="primary-outline"
            >
              <MinusIcon size={15} />
            </Button>
            <h1 className="text-3xl text-primary">{counter}</h1>
            <Button
              type="button"
              onClick={handleIncrement}
              className="!p-2 !min-h-[40px]"
              variant="primary-outline"
            >
              <PlusIcon size={15} />
            </Button>
          </div>
          <div className="flex justify-center gap-3 sm:gap-7 flex-wrap">
            <Button onClick={close} type="button" variant="primary-outline">
              Cancelar
            </Button>
            <Button onClick={handleSave} type="button" icon={<ShoppingCart size={20} />}>
              Agregar ({counter})
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
