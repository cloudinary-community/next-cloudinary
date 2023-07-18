import React, { useState, useCallback } from 'react';
import Image, { ImageProps } from 'next/image';
import { getTransformations } from '@cloudinary-util/util';
import { transformationPlugins } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions } from '@cloudinary-util/url-loader';

import { pollForProcessingImage } from '../../lib/cloudinary';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

export type CldImageProps = Omit<ImageProps, 'src'> & ImageOptions & {
  src: string;
  preserveTransformations?: boolean;
  config?: ConfigOptions;
};

const CldImage = (props: CldImageProps) => {
  const CLD_OPTIONS = [
    'deliveryType',
    'preserveTransformations'
  ];

  transformationPlugins.forEach(({ props = [] }) => {
    props.forEach(prop => {
      if ( CLD_OPTIONS.includes(prop) ) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  });

  // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps = {
    alt: props.alt,
    src: props.src,
  };

  (Object.keys(props) as Array<keyof typeof props>)
    .filter(key => !CLD_OPTIONS.includes(key))
    // @ts-expect-error
    .forEach(key => imageProps[key] = props[key]);

  const defaultImgKey = (Object.keys(imageProps) as Array<keyof typeof imageProps>).map(key => `${key}:${imageProps[key]}`).join(';');
  const [imgKey, setImgKey] = useState(defaultImgKey);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  const cldOptions = {};

  CLD_OPTIONS.forEach(key => {
    // @ts-expect-error
    if ( props[key] ) {
      // @ts-expect-error
      cldOptions[key] = props[key] || undefined;
    }
  });

  // Try to preserve the original transformations from the Cloudinary URL passed in
  // to the component. This only works if the URL has a version number on it and otherwise
  // will fail to load

  if (props.preserveTransformations) {
    try {
      const transformations = getTransformations(props.src).map(t => t.join(','));
      // @ts-expect-error
      cldOptions.rawTransformations = [...transformations.flat(), ...(props.rawTransformations || [])];
    } catch(e) {
      console.warn(`Failed to preserve transformations: ${(e as Error).message}`)
    }
  }

  /**
   * handleOnError
   */

  async function onError(options: React.SyntheticEvent<HTMLImageElement, Event>) {
    let pollForImage = true;

    if ( typeof props.onError === 'function' ) {
      const onErrorResult = props.onError(options);

      if ( typeof onErrorResult === 'boolean' && onErrorResult === false ) {
        pollForImage = false;
      }
    } else if ( typeof props.onError === 'boolean' && props.onError === false ) {
      pollForImage = false;
    }

    // Give an escape hatch in case the user wants to handle the error themselves
    // or if they want to disable polling for the image

    if ( pollForImage === false ) return;

    const image = options.target as HTMLImageElement
    const result = await pollForProcessingImage({ src: image.src })

    if ( result ) {
      setImgKey(`${defaultImgKey};${Date.now()}`);
    }
  }

  const handleOnError = useCallback(onError, [pollForProcessingImage, defaultImgKey]);

  // Copypasta from https://github.com/prismicio/prismic-next/pull/79/files
  // Thanks Angelo!
  // TODO: Remove once https://github.com/vercel/next.js/issues/52216 is resolved.

  let ResolvedImage = Image;

  if ("default" in ResolvedImage) {
    ResolvedImage = (ResolvedImage as unknown as { default: typeof Image }).default;
  }

  return (
    <ResolvedImage
      key={imgKey}
      {...imageProps}
      loader={(loaderOptions) => cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig: props.config })}
      onError={handleOnError}
    />
  );
}

export default CldImage;
