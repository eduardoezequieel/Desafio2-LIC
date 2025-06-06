import { Link, useNavigate } from 'react-router';
import { CartTable } from '../components/CartTable';
import Button from '../ui/Button';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import { clearCart } from '../services/actions';

const CartPage = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const finishPurchase = async () => {
    if (cart.length === 0) {
      toast.error('El carrito está vacío. Agrega productos antes de comprar.');
      return;
    }

    try {
      await clearCart(cart);
      await fetchCart();
      toast.success('Compra realizada con éxito.');

      // Redirigir al usuario a la página de inicio o a una página de confirmación
      navigate('/');
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
      toast.error('Ocurrió un error al procesar tu compra. Inténtalo de nuevo más tarde.');
    }
  };
  return (
    <div className="container mx-auto pt-5 pb-14 flex flex-col gap-5 px-4 sm:px-6 md:px-6 lg:px-6">
      <h1 className="text-primary text-3xl font-bold">Carrito de Compra</h1>
      <CartTable />
      <div className="flex justify-end">
        <p className="text-primary text-2xl font-semibold">
          Total:{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(cart.reduce((total, item) => total + item.price * item.quantity, 0))}
        </p>
      </div>
      <div className="flex justify-between">
        <Link to="/">
          <Button type="button" variant="primary-outline">
            Cerrar
          </Button>
        </Link>
        <Button onClick={finishPurchase} type="button">
          Comprar
        </Button>
      </div>
    </div>
  );
};
export default CartPage;
