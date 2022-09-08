import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    // Used to avoid issues with SSR particularly for the blurred placeholder
    analytics: false
  }
});

/**
 * createPlaceholderUrl
 */

export function createPlaceholderUrl({ src, placeholder }) {
  const cldImage = cld.image(src)
                      .resize('c_limit,w_100')
                      .delivery('q_1')
                      .format('auto');

  if ( placeholder === 'grayscale' ) {
    cldImage.effect('e_grayscale');
  }

  if ( placeholder.includes('color:') ) {
    const color = placeholder.split(':').splice(1).join(':')
    cldImage.effect('e_grayscale');
    cldImage.effect(`e_colorize:60,co_${color}`);
  }

  return cldImage.toURL();
}