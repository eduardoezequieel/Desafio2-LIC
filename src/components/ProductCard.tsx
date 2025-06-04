export const ProductCard = () => {
  return (
    <div className="bg-secondary-background rounded">
      <div className="rounded-sm flex h-[350px] flex-col items-center justify-center p-4">
        <img className="w-full rounded-sm h-full object-cover" src="/shopping1.jpg" alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-2xl font-semibold text-primary">Producto</h3>
          <div className="flex items-start">
            <span className="text-primary text-2xl font-semibold">$</span>
            <h3 className="text-5xl text-primary font-bold">99</h3>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quibusdam.</p>
          <div className="flex justify-between items-center">
            <div>tag name</div>
            <button>Detalles</button>
          </div>
        </div>
      </div>
    </div>
  );
};
