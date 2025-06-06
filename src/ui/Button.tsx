import React from 'react';
import clsx from 'clsx';

// Variantes de estilo para los botones
const variants = {
  'primary': 'bg-primary text-white hover:bg-primary/80',
  'primary-outline': 'bg-transparent border-3 border-primary text-primary hover:bg-primary/10',
};

// Propiedades del componente Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  icon?: React.ReactNode;
  className?: string;
}

// Componente de botón con soporte para variantes y iconos
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  className = '',
  ...props
}) => {
  // Manejador para evitar recargas de página
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      e.preventDefault();
      e.stopPropagation();
      props.onClick(e);
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        className,
        variants[variant],
        'py-3 uppercase min-h-[50px] font-bold rounded-sm text-sm cursor-pointer transition-all',
        {
          'pl-6 pr-8': !!icon,
          'px-8': !icon,
        }
      )}
      {...props}
      onClick={handleClick}
    >
      {icon ? (
        <div className="flex gap-2 items-center">
          {icon}
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
