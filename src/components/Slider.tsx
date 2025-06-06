import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimitiveSlider from 'react-slick';

/**
 * Tipo que define las opciones configurables para el componente Slider
 * Reutiliza los tipos de propiedades del componente subyacente react-slick
 */
type SliderSettings = React.ComponentProps<typeof PrimitiveSlider>;

/**
 * Configuración predeterminada del carrusel de imágenes
 * Estas opciones pueden ser sobrescritas a través de las props
 *
 * @property {boolean} infinite - Determina si el slider debe hacer un bucle infinito
 * @property {number} speed - Velocidad de la animación en milisegundos
 * @property {number} slidesToShow - Cantidad de diapositivas a mostrar a la vez
 * @property {number} slidesToScroll - Cantidad de diapositivas a desplazar por interacción
 * @property {boolean} autoplay - Activa el avance automático de diapositivas
 * @property {boolean} arrows - Muestra controles de navegación (flechas)
 * @property {number} autoplaySpeed - Intervalo entre avances automáticos en milisegundos
 */
const sliderOptions: SliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  autoplaySpeed: 3000,
};

/**
 * Propiedades para el componente Slider personalizado
 *
 * @interface Props
 * @property {SliderSettings} [settings] - Configuración personalizada para el slider (opcional)
 * @property {string[]} images - Array de URLs de imágenes para mostrar en el slider
 */
interface Props {
  settings?: SliderSettings;
  images: string[];
}

/**
 * Componente de carrusel de imágenes responsivo
 *
 * Este componente encapsula la biblioteca react-slick para crear un slider de imágenes
 * con opciones predefinidas pero personalizables y diseño responsivo.
 *
 * @param {Props} props - Propiedades del componente
 * @param {string[]} props.images - Array de URLs de las imágenes a mostrar
 * @param {SliderSettings} props.settings - Configuración opcional para personalizar el slider
 * @returns {JSX.Element} - Carrusel de imágenes configurado
 */
export const Slider = ({ images, settings = {} }: Props) => {
  // Combina las opciones predeterminadas con las opciones personalizadas
  const mergedSettings: SliderSettings = {
    ...sliderOptions,
    ...settings,
  };

  return (
    <div className="w-full mx-auto">
      <PrimitiveSlider {...mergedSettings}>
        {/* Mapeamos cada imagen a una diapositiva en el carrusel */}
        {images.map((image, index) => (
          <div key={index} className="w-full h-64 md:h-[300px] lg:h-[450px]">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </PrimitiveSlider>
    </div>
  );
};
