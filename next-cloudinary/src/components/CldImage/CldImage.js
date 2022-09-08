import Image from 'next/image';

import { createPlaceholderUrl } from '../../lib/cloudinary';
import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

const CldImage = ({ crop, gravity, overlays, removeBackground, tint, underlays, ...props }) => {
  const cldOptions = {
    crop,
    gravity,
    overlays,
    removeBackground,
    tint,
    underlays,
  };

  const imageProps = {};

  // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if ( props.placeholder ) {
    imageProps.blurDataURL = createPlaceholderUrl({
      src: props.src,
      placeholder: props.placeholder
    });

    if ( props.placeholder !== 'blur' ) {
      props.placeholder = 'blur';
    }
  }

  return (
    <Image
      {...imageProps}
      {...props}
      loader={(options) => cloudinaryLoader({ ...props, options }, cldOptions)}
    />
  );
}

export default CldImage;