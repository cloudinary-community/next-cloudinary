
import Image from 'next/image';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

const CldImage = ({ overlays, removeBackground, underlays, ...props }) => {
  const cldOptions = {
    overlays,
    removeBackground,
    underlays,
  };
  return <Image {...props} loader={(options) => cloudinaryLoader(options, cldOptions)} />
}

export default CldImage;