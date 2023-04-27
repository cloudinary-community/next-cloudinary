import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { getTransformations } from '@cloudinary-util/util';
import { transformationPlugins } from '@cloudinary-util/url-loader';
import type { ImageOptions } from '@cloudinary-util/url-loader';

import { pollForProcessingImage } from '../../lib/cloudinary';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

export type CldImageProps = Omit<ImageProps, 'src'> & ImageOptions & {
  src: string;
  preserveTransformations?: boolean;
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
  })

  // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps = {
    alt: props.alt,
    src: props.src
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

  interface HandleOnError {
    target: any;
  }

  async function handleOnError(options: HandleOnError) {
    const result = await pollForProcessingImage({ src: options.target.src })
    if ( result ) {
      setImgKey(`${defaultImgKey};${Date.now()}`);
    }
  }

  return (
    <Image
      key={imgKey}
      {...imageProps}
      loader={(loaderOptions) => cloudinaryLoader({ loaderOptions, imageProps, cldOptions })}
      onError={handleOnError}
    />
  );
}

export default CldImage;
