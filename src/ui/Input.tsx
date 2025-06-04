import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = ({ icon, className, ...props }: InputProps) => {
  const input = (
    <input
      className={clsx(
        'rounded-2xl border-2 px-3 py-2 text-primary font-semibold border-border outline-none focus:ring-2 focus:ring-border/60 transition-all',
        className,
        {
          'pl-9': icon,
        }
      )}
      {...props}
    ></input>
  );

  if (icon) {
    return (
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
        {input}
      </div>
    );
  }
  return input;
};
