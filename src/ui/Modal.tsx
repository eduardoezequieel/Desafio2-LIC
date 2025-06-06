import React from 'react';
import '../css/dialog.css';

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, close, children }) => {
  // Prevent clicks from bubbling to parent elements
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Prevent default on the overlay as well
  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    close();
  };

  if (!open) return null;

  return (
    <div
      className="DialogOverlay"
      onClick={handleOverlayClick}
      // Prevent default browser behavior
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className="DialogContent"
        onClick={handleContentClick}
        // Ensure the dialog content doesn't behave like a form
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button
          className="IconButton"
          aria-label="Close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            close();
          }}
          type="button"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
