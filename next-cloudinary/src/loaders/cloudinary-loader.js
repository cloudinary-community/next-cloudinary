import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugin from '../plugins/cropping';
import * as overlaysPlugin from '../plugins/overlays';
import * as removeBackgroundPlugin from '../plugins/remove-background';
import * as effectsPlugin from '../plugins/effects';
import * as underlaysPlugin from '../plugins/underlays';

import {
  primary as qualifiersPrimary,
  text as qualifiersText,
  position as qualifiersPosition
} from '../constants/qualifiers';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
});

export const transformationPlugins = [
  removeBackgroundPlugin, // Background Removal must always come first
  croppingPlugin,
  effectsPlugin,
  overlaysPlugin,
  underlaysPlugin
];

export function cloudinaryLoader(options, cldOptions) {
  const {
    src,
    width,
    format = 'auto',
    quality = 'auto',
  } = options;

  const cldImage = cld.image(src);

  transformationPlugins.forEach(({ plugin }) => {
    plugin({
      cldImage,
      options,
      cldOptions
    });
  });

  return cldImage.format(format).delivery(`q_${quality}`).toURL();
}