import Image from 'next/image';

import { createPlaceholderUrl } from '../../lib/cloudinary';
import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

import { options as CLD_OPTIONS } from '../../constants/options';

const CldImage = props => {

  // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps = {};

  Object.keys(props)
    .filter(key => !CLD_OPTIONS.includes(key))
    .forEach(key => imageProps[key] = props[key]);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  const cldOptions = {};

  CLD_OPTIONS.forEach(key => {
    if ( props[key] ) {
      cldOptions[key] = props[key];
    }
  });

  // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  //
  // We need to do this logic here as we potentially need to mutate
  // an Image component prop as opposed to simply the URL
  //
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if ( imageProps.placeholder ) {
    imageProps.blurDataURL = createPlaceholderUrl({
      src: props.src,
      placeholder: props.placeholder
    });

    if ( imageProps.placeholder !== 'blur' ) {
      imageProps.placeholder = 'blur';
    }
  }

  return (
    <Image
      {...imageProps}
      loader={(options) => cloudinaryLoader({ ...imageProps, options }, cldOptions)}
    />
  );
}

export default CldImage;