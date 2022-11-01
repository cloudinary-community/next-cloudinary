import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugin from '../plugins/cropping';
import * as effectsPlugin from '../plugins/effects';
import * as overlaysPlugin from '../plugins/overlays';
import * as rawTransformationsPlugin from '../plugins/raw-transformations';
import * as removeBackgroundPlugin from '../plugins/remove-background';
import * as underlaysPlugin from '../plugins/underlays';
import * as zoompanPlugin from '../plugins/zoompan';

import {
  primary as qualifiersPrimary,
  text as qualifiersText,
  position as qualifiersPosition
} from '../constants/qualifiers';

export const transformationPlugins = [
  // Background Removal must always come first
  removeBackgroundPlugin,

  croppingPlugin,
  effectsPlugin,
  overlaysPlugin,
  underlaysPlugin,
  zoompanPlugin,

  // Raw transformations needs to be last simply to make sure
  // it's always expected to applied the same way

  rawTransformationsPlugin
];

let cld;

/**
 * constructCloudinaryUrl
 */

export function constructCloudinaryUrl({ options, config }) {
  if ( !cld ) {
    cld = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      url: {
        // Used to avoid issues with SSR particularly for the blurred placeholder
        analytics: false
      },
      ...config
    });
  }

  const publicId = getPublicId(options.src);

  const cldImage = cld.image(publicId);

  transformationPlugins.forEach(({ plugin }) => {
    const { options: pluginOptions } = plugin({
      cldImage,
      options
    }) || {};

    if ( pluginOptions?.format ) {
      options.format = pluginOptions.format;
    }
  });

  return cldImage
          .setDeliveryType(options.deliveryType || 'upload')
          .format(options.format || 'auto')
          .delivery(`q_${options.quality || 'auto'}`)
          .toURL();
}

/**
 * Retrieves the public id of a cloudiary image url. If no url is recognized it returns the parameter it self.
 * If it's recognized that is a url and it's not possible to get the public id, it warns the user.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */

export function getPublicId(src) {
  if ( typeof src !== 'string' ) {
    throw new Error(`Invalid src of type ${typeof src}`);
  }

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
      console.warn(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudinary image url.`)
    }
  }

  return src;
}

/**
 * Retrieves the transformations added to a cloudiary image url. If no transformation is recognized it returns an empty array.
 *
 * @param {string} src The cloudiary url.
 *
 * @return {array} The array of transformations
 */

 export function getTransformations(src, preserveTransformations) {
  if (typeof src !== "string") {
    throw new Error(`Invalid src of type ${typeof src}`);
  }

  if (src.includes("res.cloudinary.com") && preserveTransformations) {
    const regex = new RegExp(
      "(https?)://(res.cloudinary.com)/([^/]+)/(image|video|raw)/(upload|authenticated)/(.*)/(v[0-9]+)/(.+)(?:.[a-z]{3})?",
      "gi"
    );
    const groups = regex.exec(src);
    const transformationStr = groups.slice(1).find((i) => i.includes("_"));

    if (transformationStr) {
      return transformationStr.split(",").join("/").split("/");
    } else {
      return [];
    }
  }

  return [];
}

/**
 * createPlaceholderUrl
 */

export function createPlaceholderUrl({ src, placeholder = true, config }) {
  const rawTransformations = [];

  if ( placeholder === 'grayscale' ) {
    rawTransformations.push('e_grayscale');
  }

  if ( typeof placeholder === 'string' && placeholder.includes('color:') ) {
    const color = placeholder.split(':').splice(1).join(':')
    rawTransformations.push('e_grayscale');
    rawTransformations.push(`e_colorize:60,co_${color}`);
  }

  return constructCloudinaryUrl({
    options: {
      src,
      width: 100,
      quality: 1,
      rawTransformations,
    },
    config
  });;
}
