import { ImageProps } from 'next/image';

import { getCldImageUrl } from '../helpers/getCldImageUrl';

export interface CloudinaryLoaderCldOptions {
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
  
  // // The loader options are used to create dynamic sizing when working with responsive images
  // // so these should override the default options collected from the props alone if
  // // the results are different. While we don't always use the height in the loader logic,
  // // we always pass it here, as the usage is determined later based on cropping.js

  if ( typeof loaderOptions?.width === 'number' && typeof options.width === 'number' && loaderOptions.width !== options.width ) {
    const multiplier = loaderOptions.width / options.width;
    
    options.width = loaderOptions.width;

    // The height may change based off of the value passed through via the loader options
    // In an example where the user sizes is 800x600, but the loader is passing in 400
    // due to responsive sizing, we want to ensure we're using a height that will
    // resolve to the same aspect ratio
    
    if ( typeof options.height === 'number' ) {
      options.height = Math.floor(options.height * multiplier);
    }
  } else if ( typeof loaderOptions?.width === 'number' && typeof options?.width !== 'number' ) {
    // If we don't have a width on the options object, this may mean that the component is using
    // the fill option: https://nextjs.org/docs/pages/api-reference/components/image#fill
    // The Fill option does not allow someone to pass in a width or a height
    // If this is the case, we still need to define a width for sizing optimization but also
    // for responsive sizing to take effect, so we can utilize the loader width for the base width
    options.width = loaderOptions?.width;
  }

  // @ts-ignore
  return getCldImageUrl(options, cldConfig);
}