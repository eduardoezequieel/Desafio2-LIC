import clsx from 'clsx';

/**
 * Props para el componente Input
 * Extiende las propiedades estándar de HTML para elementos input
 * @interface InputProps
 * @property {React.ReactNode} icon - Icono opcional que se mostrará dentro del input
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

/**
 * Componente de entrada de texto personalizado
 *
 * Este componente permite crear campos de entrada con estilos consistentes
 * y opcionalmente incluir un icono al inicio del campo.
 *
 * @param {InputProps} props - Propiedades del componente
 * @param {React.ReactNode} props.icon - Icono opcional para mostrar dentro del input
 * @param {string} props.className - Clases CSS adicionales para aplicar al input
 * @param {Object} props - Resto de propiedades estándar de un elemento input HTML
 * @returns {JSX.Element} - Elemento de entrada estilizado con o sin icono
 */
export const Input = ({ icon, className, ...props }: InputProps) => {
  // Creamos el elemento de entrada con los estilos y propiedades correspondientes
  const input = (
    <input
      className={clsx(
        'rounded-2xl border-2 px-3 py-2 text-primary font-semibold border-border outline-none focus:ring-2 focus:ring-border/60 transition-all',
        className,
        {
          'pl-9': icon, // Aplicamos padding izquierdo adicional si hay un icono
        }
      )}
      {...props}
    ></input>
  );

  // Si se proporciona un icono, lo envolvemos en un contenedor para posicionarlo correctamente
  if (icon) {
    return (
      <div className="relative w-full">
        {/* Contenedor del icono posicionado absolutamente */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
        {input}
      </div>
    );
  }

  // Si no hay icono, devolvemos solo el input
  return input;
};
