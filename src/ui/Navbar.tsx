import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4">
      <div>
        <h1 className="sm:block hidden text-2xl font-semibold text-primary">Mi Tienda</h1>
      </div>
      <div>
        <button
          type="button"
          className="flex gap-3 cursor-pointer transition-all hover:bg-secondary-background p-2 rounded"
        >
          <ShoppingCart fill="#29323d" className="text-primary" />
          <span className="font-medium text-primary">$129.99</span>
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
