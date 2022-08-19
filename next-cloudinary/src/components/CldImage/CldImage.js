import { Cloudinary } from '@cloudinary/url-gen';
import Image from 'next/image';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

function cloudinaryLoader(options, cldOptions) {
  const {
    src,
    width,
    format = 'auto',
    quality = 'auto'
  } = options;

  const {
    effects = [],
    removeBackground = false
  } = cldOptions;

  const cldImage = cld.image(src);

  if ( removeBackground ) {
    cldImage.effect('e_background_removal');
  }

  effects.forEach(effect => cldImage.effect(effect));

  return cldImage.resize(`c_limit,w_${width}`).format(format).delivery(`q_${quality}`).toURL();
}

const CldImage = ({ effects, removeBackground, ...props }) => {
  const cldOptions = {
    effects,
    removeBackground
  };
  return <Image {...props} loader={(options) => cloudinaryLoader(options, cldOptions)} />
}

export default CldImage;