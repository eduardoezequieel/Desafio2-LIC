import { useState } from 'react';

interface CartItem {
  id: number;
  product: string;
  price: number;
  quantity: number;
  image: string;
}

export const CartTable = () => {
  // Example data - in a real app this would come from a context or props
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, product: 'Product 1', price: 29.99, quantity: 2, image: '/product1.jpg' },
    { id: 2, product: 'Product 2', price: 19.99, quantity: 1, image: '/product2.jpg' },
    { id: 3, product: 'Product 3', price: 49.99, quantity: 3, image: '/product3.jpg' },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-md">
      <div className="border-2 border-border rounded-md overflow-hidden">
        <table className="min-w-full bg-white border-separate border-spacing-0">
          <thead className="bg-white text-primary">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-center border-r-2 border-b-2 border-border">
                Producto
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-center border-r-2 border-b-2 border-border w-28">
                Precio
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-center border-r-2 border-b-2 border-border w-32">
                Cantidad
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-center border-b-2 border-border w-28">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="hover:bg-primary-background">
                <td className="py-4 px-4 border-r-2 border-b-2 border-border">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md border border-[var(--color-border)] overflow-hidden">
                      <div className="h-full w-full bg-[var(--color-tertiary-background)] flex items-center justify-center text-sm text-[var(--color-secondary)]">
                        Image
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[var(--color-primary)]">
                        {item.product}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-sm text-[var(--color-primary)] border-r-2 border-b-2 border-border w-28">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-4 border-r-2 border-b-2 border-border w-32">
                  <div className="flex items-center justify-center">
                    <button
                      className="px-2 cursor-pointer py-1 text-sm border border-[var(--color-border)] rounded-l-md bg-[var(--color-secondary-background)] text-[var(--color-primary)]"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <div className="w-10 text-center border-t border-b border-[var(--color-border)] py-1 text-sm text-[var(--color-primary)]">
                      {item.quantity}
                    </div>
                    <button
                      className="px-2 py-1 cursor-pointer text-sm border border-[var(--color-border)] rounded-r-md bg-[var(--color-secondary-background)] text-[var(--color-primary)]"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-center font-medium text-primary border-b-2 border-border w-28">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
