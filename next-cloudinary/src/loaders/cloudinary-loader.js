import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';

export function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig = {} }) {
  const options = {
    ...imageProps,
    ...cldOptions
  }

  options.width = parseInt(options.width);
  options.height = parseInt(options.height);

  // The loader options are used to create dynamic sizing when working with responsive images
  // so these should override the default options collected from the props alone if
  // the results are different. While we don't always use the height in the loader logic,
  // we always pass it here, as the usage is determined later based on cropping.js

  if ( loaderOptions?.width && loaderOptions.width !== options.width ) {
    const multiplier = loaderOptions.width / options.width;
    options.widthResize = loaderOptions.width;
    options.heightResize = Math.round(options.height * multiplier);
  }

  return constructCloudinaryUrl({
    options,
    config: {
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      ...cldConfig
    },
    analytics: {
      sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: NEXT_CLOUDINARY_VERSION,
      techVersion: NEXT_VERSION,
      feature: ''
    }
  });
}