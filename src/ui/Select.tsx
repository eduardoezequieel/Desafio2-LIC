import clsx from 'clsx';
import { useId, useState, useEffect } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

export const Select = ({
  icon,
  className,
  options,
  value,
  defaultValue,
  ...props
}: SelectProps) => {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');

  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  options = [{ value: '', label: 'Categoría' }, ...options];

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
      )}
      <select
        className={clsx(
          'rounded-lg border-2 px-3 py-2 font-semibold border-border outline-none focus:ring-2 focus:ring-border/60 transition-all appearance-none bg-white cursor-pointer',
          className,
          {
            'pl-9': icon,
            'pr-8': true, // Always add padding for the dropdown arrow
            'text-primary': selectedValue !== '',
            'text-gray-400': selectedValue === '', // Placeholder style color
          }
        )}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        value={value !== undefined ? value : selectedValue}
        {...props}
      >
        {options.map((option) => (
          <option className="text-primary" key={`${id}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute border-l-2 border-border justify-center h-full w-[25px] flex items-center right-1 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  );
};
