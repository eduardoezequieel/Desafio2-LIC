import { Link } from 'react-router';
import { CartTable } from '../components/CartTable';
import Button from '../ui/Button';

const CartPage = () => {
  return (
    <div className="container mx-auto pt-5 flex flex-col gap-5 px-4 sm:px-6 md:px-6 lg:px-6">
      <h1 className="text-primary text-3xl font-bold">Carrito de Compra</h1>
      <CartTable />
      <div className="flex justify-between">
        <Link to="/">
          <Button type="button" variant="primary-outline">
            Cerrar
          </Button>
        </Link>
        <Button type="button">Comprar</Button>
      </div>
    </div>
  );
};
export default CartPage;
