import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugin from '../plugins/cropping';
import * as overlaysPlugin from '../plugins/overlays';
import * as removeBackgroundPlugin from '../plugins/remove-background';
import * as effectsPlugin from '../plugins/effects';
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
  removeBackgroundPlugin, // Background Removal must always come first
  croppingPlugin,
  effectsPlugin,
  overlaysPlugin,
  underlaysPlugin,
  zoompanPlugin
];

export function cloudinaryLoader(defaultOptions, cldOptions) {
  const options = {
    format: 'auto',
    quality: 'auto',
    ...defaultOptions
  };

  const cldImage = cld.image(options.src);

  transformationPlugins.forEach(({ plugin, options: pluginOptions }) => {
    plugin({
      cldImage,
      options,
      cldOptions
    });

    if ( pluginOptions?.format ) {
      options.format = pluginOptions.format;
    }
  });

  return cldImage
          .format(options.format)
          .delivery(`q_${options.quality}`)
          .toURL();
}