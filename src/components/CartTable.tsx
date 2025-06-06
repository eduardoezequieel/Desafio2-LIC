import { toast } from 'sonner';
import { useCart } from '../hooks/useCart';
import { removeFromCart, updateCart } from '../services/actions';

/**
 * Componente CartTable
 *
 * Este componente muestra una tabla responsiva con los productos añadidos al carrito
 * y permite al usuario actualizar las cantidades o eliminar productos.
 *
 * Utiliza el contexto del carrito a través del hook useCart para acceder
 * a los datos y funciones relacionadas con el carrito de compras.
 *
 * @returns {JSX.Element} Tabla de carrito de compras
 */
export const CartTable = () => {
  // Obtenemos el carrito y la función para actualizarlo desde el contexto
  const { cart, fetchCart } = useCart();

  /**
   * Actualiza la cantidad de un producto en el carrito o lo elimina si la cantidad es menor a 1
   *
   * @param {string} id - Identificador del elemento del carrito
   * @param {number} newQuantity - Nueva cantidad a establecer
   */
  const updateQuantity = async (id: string, newQuantity: number) => {
    // Si la cantidad es menor a 1, eliminamos el producto del carrito
    if (newQuantity < 1) {
      removeFromCart(id);
      await fetchCart();
      return;
    }

    // Validamos que no se exceda la cantidad máxima permitida
    if (newQuantity > 99) {
      toast.warning('La cantidad máxima permitida es 99.');
      return;
    } // Encontramos el elemento en el carrito y separamos el objeto producto
    // del resto de propiedades para evitar duplicación en la petición
    // Nota: Desestructuramos 'product' para excluirlo intencionadamente del objeto que enviaremos
    const { product, ...updatedCartItem } = cart.find((item) => item.id === id)!;
    if (updatedCartItem) {
      // Creamos el objeto actualizado con la nueva cantidad
      const updatedItem = {
        ...updatedCartItem,
        quantity: newQuantity,
      };

      // Actualizamos el carrito en el servidor y refrescamos los datos
      await updateCart(updatedItem);
      await fetchCart();
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-md">
      <div className="border-2 border-border rounded-md overflow-hidden">
        {/* Tabla responsiva para mostrar productos del carrito */}
        <table className="min-w-full bg-white border-separate border-spacing-0">
          {/* Encabezado de la tabla */}
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
          {/* Cuerpo de la tabla con los productos */}
          <tbody>
            {/* Iteramos sobre los elementos del carrito */}
            {cart.map((item) => (
              <tr key={item.id} className="hover:bg-primary-background">
                {/* Columna de información del producto con imagen */}
                <td className="py-4 px-4 border-r-2 border-b-2 border-border">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 rounded-md border border-[var(--color-border)] overflow-hidden">
                      <div className="h-full w-full bg-[var(--color-tertiary-background)] flex items-center justify-center text-sm text-[var(--color-secondary)]">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-[var(--color-primary)]">
                        {item.product.name}
                      </div>
                    </div>
                  </div>
                </td>
                {/* Columna de precio unitario */}
                <td className="py-4 px-4 text-center text-sm text-[var(--color-primary)] border-r-2 border-b-2 border-border w-28">
                  ${item.price.toFixed(2)}
                </td>
                {/* Columna de control de cantidad con botones + y - */}
                <td className="py-4 px-4 border-r-2 border-b-2 border-border w-32">
                  <div className="flex items-center justify-center">
                    {/* Botón para disminuir cantidad */}
                    <button
                      className="px-2 cursor-pointer py-1 text-sm border border-[var(--color-border)] rounded-l-md bg-[var(--color-secondary-background)] text-[var(--color-primary)]"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    {/* Indicador de cantidad actual */}
                    <div className="w-10 text-center border-t border-b border-[var(--color-border)] py-1 text-sm text-[var(--color-primary)]">
                      {item.quantity}
                    </div>
                    {/* Botón para aumentar cantidad */}
                    <button
                      className="px-2 py-1 cursor-pointer text-sm border border-[var(--color-border)] rounded-r-md bg-[var(--color-secondary-background)] text-[var(--color-primary)]"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </td>
                {/* Columna de subtotal (precio × cantidad) */}
                <td className="py-4 px-4 text-center font-medium text-primary border-b-2 border-border w-28">
                  {/* Formateo de moneda para mostrar el subtotal correctamente */}
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(item.price * item.quantity)}
                </td>
              </tr>
            ))}

            {/* Mensaje cuando el carrito está vacío */}
            {cart.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-primary font-semibold">
                  No hay productos en el carrito.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
