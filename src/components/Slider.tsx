import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrimitiveSlider from 'react-slick';

// Definición de los tipos para las opciones del slider
type SliderSettings = React.ComponentProps<typeof PrimitiveSlider>;

// Opciones predeterminadas para el slider
const sliderOptions: SliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  autoplaySpeed: 3000,
};

// Propiedades del componente Slider
interface Props {
  settings?: SliderSettings;
  images: string[];
}

export const Slider = ({ images, settings = {} }: Props) => {
  // Combina las opciones predeterminadas con las opciones personalizadas
  const mergedSettings: SliderSettings = {
    ...sliderOptions,
    ...settings,
  };

  return (
    <div className="w-full mx-auto">
      <PrimitiveSlider {...mergedSettings}>
        {images.map((image, index) => (
          <div key={index} className="w-full h-64 md:h-[300px] lg:h-[450px]">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </PrimitiveSlider>
    </div>
  );
};
