import Image from 'next/image';
import { Cloudinary } from '@cloudinary/url-gen';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    // Used to avoid issues with SSR particularly for the blurred placeholder
    analytics: false
  }
});

const CldImage = ({ overlays, removeBackground, underlays, ...props }) => {
  const cldOptions = {
    overlays,
    removeBackground,
    underlays,
  };

  const imageProps = {};

  // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if ( props.placeholder ) {
    const cldBlurredImage = cld.image(props.src)
                                .resize('c_limit,w_100')
                                .delivery('q_1')
                                .format('auto');

    if ( props.placeholder === 'grayscale' ) {
      cldBlurredImage.effect('e_grayscale');
    }

    if ( props.placeholder.includes('color:') ) {
      const color = props.placeholder.split(':').splice(1).join(':')
      cldBlurredImage.effect('e_grayscale');
      cldBlurredImage.effect(`e_colorize:60,co_${color}`);
    }

    imageProps.blurDataURL = cldBlurredImage.toURL();

    if ( props.placeholder !== 'blur' ) {
      props.placeholder = 'blur';
    }
  }

  return (
    <Image
      {...imageProps}
      {...props}
      loader={(options) => cloudinaryLoader(options, cldOptions)}
    />
  );
}

export default CldImage;