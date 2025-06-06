import clsx from 'clsx';
import { useId, useState, useEffect } from 'react';

/**
 * Props para el componente Select
 * Extiende las propiedades estándar de HTML para elementos select
 * @interface SelectProps
 * @property {React.ReactNode} icon - Icono opcional que se mostrará dentro del select
 * @property {Array} options - Lista de opciones para mostrar en el desplegable
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

/**
 * Componente de selección desplegable personalizado
 *
 * Este componente crea un elemento select estilizado con soporte para:
 * - Icono opcional dentro del campo
 * - Personalización visual del desplegable
 * - Funcionalidad de placeholder
 * - Manejo de estados controlados y no controlados
 *
 * @param {SelectProps} props - Propiedades del componente
 * @returns {JSX.Element} - Elemento select estilizado con soporte para icono y flecha desplegable
 */
export const Select = ({
  icon,
  className,
  options,
  value,
  defaultValue,
  ...props
}: SelectProps) => {
  // Generamos un ID único para las opciones del select
  const id = useId();

  // Estado interno para manejar el valor seleccionado (para modo no controlado)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');

  // Actualizamos el estado interno cuando cambia el valor controlado externamente
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Añadimos una opción de "Categoría" como valor por defecto
  options = [{ value: '', label: 'Categoría' }, ...options];

  return (
    <div className="relative w-fit">
      {/* Renderizamos el icono si está presente */}
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
      )}

      {/* Elemento select con estilos y comportamiento personalizado */}
      <select
        className={clsx(
          'rounded-lg border-2 px-3 py-2 font-semibold border-border outline-none focus:ring-2 focus:ring-border/60 transition-all appearance-none bg-white cursor-pointer',
          className,
          {
            'pl-9': icon, // Padding izquierdo adicional si hay icono
            'pr-8': true, // Siempre añadir padding para la flecha desplegable
            'text-primary': selectedValue !== '', // Color de texto normal para valor seleccionado
            'text-gray-400': selectedValue === '', // Color de texto más claro para el placeholder
          }
        )}
        onChange={(e) => {
          // Actualizamos el estado interno y propagamos el evento si hay un manejador externo
          setSelectedValue(e.target.value);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        // Usamos el valor externo si está presente, de lo contrario el estado interno
        value={value !== undefined ? value : selectedValue}
        {...props}
      >
        {/* Mapeamos las opciones para crear los elementos option */}
        {options.map((option) => (
          <option className="text-primary" key={`${id}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Flecha desplegable personalizada */}
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
