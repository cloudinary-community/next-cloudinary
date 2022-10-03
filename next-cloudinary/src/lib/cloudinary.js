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
 * Retrieves the public id of a cloudiary image url. If no url is recognized it returns the parameter it self.
 * If it's recognized that is a url and it's not possible to get the public id, it warns the user.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */
export function getPublicId(src) {
  if ( src.includes('res.cloudinary.com') ) {
    const regexWithTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(.*)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/
    const regexWithoutTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/

    const withTransformations = src.match(regexWithTransformations)
    const withoutTransformations = src.match(regexWithoutTransformations)
    
    if ( withTransformations ) {
      return withTransformations[withTransformations.length - 1]
    } else if ( withoutTransformations ) {
      return withoutTransformations[withoutTransformations.length - 1]
    } else {
      console.warn(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudiary image url.`)
      return src
    }
  }
  return src;
}

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