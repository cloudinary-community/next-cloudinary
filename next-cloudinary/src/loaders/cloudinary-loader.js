import { Cloudinary } from '@cloudinary/url-gen';
import { getPublicId } from '../lib/cloudinary';

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

let cld;

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

export function cloudinaryLoader(defaultOptions, cldOptions, cldConfig = {}) {
  if ( !cld ) {
    cld = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      url: {
        // Used to avoid issues with SSR particularly for the blurred placeholder
        analytics: false
      },
      ...cldConfig
    });
  }

  const options = {
    format: 'auto',
    quality: 'auto',
    ...defaultOptions
  };
  const publicId = getPublicId(options.src);

  const cldImage = cld.image(publicId);

  transformationPlugins.forEach(({ plugin }) => {
    const { options: pluginOptions } = plugin({
      cldImage,
      options,
      cldOptions
    }) || {};

    if ( pluginOptions?.format ) {
      options.format = pluginOptions.format;
    }
  });

  return cldImage
          .format(options.format)
          .delivery(`q_${options.quality}`)
          .toURL();
}