import { ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const { cart, fetchCart } = useCart();

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cart.reduce((total, item) => total + item.price * item.quantity, 0));

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <nav className="flex justify-between p-4 fixed top-0 left-0 right-0 z-10 bg-white shadow-md mx-auto">
      <Link to="/">
        <h1 className="hover:text-primary/70 transition-all hover:underline sm:block hidden text-2xl font-semibold text-primary">
          Mi Tienda
        </h1>
      </Link>
      <div>
        <Link to="/cart">
          <button
            type="button"
            className="flex gap-3 cursor-pointer transition-all hover:bg-secondary-background p-2 rounded"
          >
            <ShoppingCart fill="#29323d" className="text-primary" />
            <span className="font-medium text-primary">{totalPrice}</span>
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
