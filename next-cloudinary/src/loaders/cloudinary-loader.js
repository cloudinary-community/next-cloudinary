import { Cloudinary } from '@cloudinary/url-gen';

import { croppingPlugin } from '../plugins/cropping';
import { overlaysPlugin } from '../plugins/overlays';
import { removeBackgroundPlugin } from '../plugins/remove-background';
import { tintPlugin } from '../plugins/tint';
import { underlaysPlugin } from '../plugins/underlays';

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

const transformationPlugins = [
  // Background Removal must always come first
  removeBackgroundPlugin,

  croppingPlugin,
  tintPlugin,
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

  transformationPlugins.forEach(plugin => {
    plugin({
      cldImage,
      options,
      cldOptions
    });
  });

  return cldImage.format(format).delivery(`q_${quality}`).toURL();
}