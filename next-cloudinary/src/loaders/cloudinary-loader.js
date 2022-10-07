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

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    // Used to avoid issues with SSR particularly for the blurred placeholder
    analytics: false
  }
});

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

export function cloudinaryLoader(defaultOptions, cldOptions) {
  const options = {
    format: 'auto',
    quality: 'auto',
    ...defaultOptions
  };

  const cldImage = cld.image(options.src);

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