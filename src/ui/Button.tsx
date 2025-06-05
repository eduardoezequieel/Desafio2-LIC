import clsx from 'clsx';

const variants = {
  'primary': 'bg-primary text-white hover:bg-primary/80',
  'primary-outline': 'bg-transparent border-3 border-primary text-primary hover:bg-primary/10',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  variant?: keyof typeof variants;
}

const Button = ({ icon, variant = 'primary', className, children, ...props }: ButtonProps) => {
  return (
    <button
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
