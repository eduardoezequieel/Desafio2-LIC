import { ProductContainer } from '../components/ProductContainer';
import { Slider } from '../components/Slider';
import { IMAGES_IMPORT } from '../utils/imagesImport';

const MainPage = () => {
  return (
    <>
      <Slider images={IMAGES_IMPORT} />
      <ProductContainer />
    </>
  );
};
export default MainPage;
