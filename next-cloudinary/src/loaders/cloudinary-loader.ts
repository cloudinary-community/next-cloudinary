import { ImageProps } from 'next/image';

import { getCldImageUrl } from '../helpers/getCldImageUrl';

export interface CloudinaryLoaderCldOptions {
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

  let widthResize;

  if ( typeof loaderOptions?.width === 'number' && typeof options.width === 'number' && loaderOptions.width !== options.width ) {
    widthResize = loaderOptions.width;
  } else if ( typeof loaderOptions?.width === 'number' && typeof options?.width !== 'number' ) {
    // If we don't have a width on the options object, this may mean that the component is using
    // the fill option: https://nextjs.org/docs/pages/api-reference/components/image#fill
    // The Fill option does not allow someone to pass in a width or a height
    // If this is the case, we still need to define a width for sizing optimization but also
    // for responsive sizing to take effect, so we can utilize the loader width for the base width

    widthResize = loaderOptions.width;
    options.width = widthResize;
  }

  // If we have a resize width that's smaller than the user-defined width, we want to give the
  // ability to perform a final resize on the image without impacting any of the effects like text
  // overlays that may depend on the size to work properly

  if ( options.width && widthResize && widthResize < options.width ) {
    options.widthResize = loaderOptions.width;
  }

  // @ts-ignore
  return getCldImageUrl(options, cldConfig);
}