import { Dialog, VisuallyHidden } from 'radix-ui';
import '../css/dialog.css';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  close: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ open, close, children }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <VisuallyHidden.Root asChild>
            <Dialog.Title className="DialogTitle"></Dialog.Title>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root asChild>
            <Dialog.Description className="DialogDescription"></Dialog.Description>
          </VisuallyHidden.Root>
          {children}
          <VisuallyHidden.Root>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <X />
              </button>
            </Dialog.Close>
          </VisuallyHidden.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
