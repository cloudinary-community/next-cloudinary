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
 * Retrieves the public id of a cloudiary image url, with or without the version, depending on the url passed.
 * Or just returns it if it is not recognized as a cloudiary image url.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */
export function getPublicId(src) {
  if ( src.includes('res.cloudinary.com' )) {
    const urlParts = src.split('/');
    const hasVersion = urlParts[urlParts.length - 3].match(/v[0-9]+/);
    return urlParts.slice(hasVersion ? -3 : -2).join('/');
  }
  return src;
}

/**
 * createPlaceholderUrl
 */

export function createPlaceholderUrl({ src, placeholder }) {
  const cldImage = cld
    .image(src)
    .resize('c_limit,w_100')
    .delivery('q_1')
    .format('auto');

  if ( placeholder === 'grayscale' ) {
    cldImage.effect('e_grayscale');
  }

  if ( placeholder.includes('color:') ) {
    const color = placeholder.split(':').splice(1).join(':');
    cldImage.effect('e_grayscale');
    cldImage.effect(`e_colorize:60,co_${color}`);
  }

  return cldImage.toURL();
}
