import { Modal } from '../ui/Modal';

interface DialogProps {
  open: boolean;
  close: () => void;
}

const ProductModal = ({ open, close }: DialogProps) => (
  <Modal open={open} close={close}>
    <div className="bg-primary-background">
      <div className="rounded-sm flex h-[200px] min-[1280px]:h-[350px] flex-col items-center justify-center pt-4 px-4 pb-1">
        <img className="w-full rounded-sm h-full object-cover" src="/shopping1.jpg" alt="" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">Producto</h3>
          <div className="flex items-start">
            <span className="text-primary text-xl sm:text-2xl font-semibold">$</span>
            <h3 className="text-4xl sm:text-5xl text-primary font-bold">99</h3>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-primary/70 font-normal text-sm sm:text-base">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quibusdam.
          </p>
          <div className="flex justify-between items-end flex-wrap gap-y-3"></div>
        </div>
      </div>
    </div>
  </Modal>
);

export default ProductModal;
