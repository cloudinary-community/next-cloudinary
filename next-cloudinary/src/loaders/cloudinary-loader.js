import { constructCloudinaryUrl } from '../lib/cloudinary';

export function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig = {} }) {
  const options = {
    ...imageProps,
    ...cldOptions
  }

  // The loader options are used to create dynamic sizing when working with responsive images
  // so these should override the default options collected from the props alone if
  // the results are different. While we don't always use the height in the loader logic,
  // we always pass it here, as the usage is determined later based on cropping.js

  if ( loaderOptions?.width && loaderOptions.width !== options.width ) {
    const multiplier = loaderOptions.width / options.width;
    options.width = loaderOptions.width;
    options.height = Math.round(options.height * multiplier);
  }

  return constructCloudinaryUrl({
    options,
    config: cldConfig
  });
}