import { ImageProps } from 'next/image';

import { getCldImageUrl } from '../helpers/getCldImageUrl';

export interface CloudinaryLoaderCldOptions {
  heightResize?: string | number;
  widthResize?: string | number;
}

export interface CloudinaryLoaderLoaderOptions {
  height?: string | number;
  width?: string | number;
}

export interface CloudinaryLoader {
  loaderOptions: CloudinaryLoaderLoaderOptions;
  imageProps: ImageProps;
  cldOptions: CloudinaryLoaderCldOptions;
  cldConfig?: object;
}

export function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig = {} }: CloudinaryLoader) {
  const options = {
    ...imageProps,
    ...cldOptions
  }

  options.width = typeof options.width === 'string' ? parseInt(options.width) : options.width;
  options.height = typeof options.height === 'string' ? parseInt(options.height) : options.height;

  // The loader options are used to create dynamic sizing when working with responsive images
  // so these should override the default options collected from the props alone if
  // the results are different. While we don't always use the height in the loader logic,
  // we always pass it here, as the usage is determined later based on cropping.js

  if ( typeof loaderOptions?.width === 'number' && typeof options.width === 'number' && loaderOptions.width !== options.width ) {
    const multiplier = loaderOptions.width / options.width;

    options.widthResize = loaderOptions.width;

    if ( typeof options.height === 'number' ) {
      options.heightResize = Math.round(options.height * multiplier);
    }
  }

  // @ts-ignore
  return getCldImageUrl(options, cldConfig);
}