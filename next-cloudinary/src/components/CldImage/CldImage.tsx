'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getTransformations } from '@cloudinary-util/util';
import { transformationPlugins } from '@cloudinary-util/url-loader';

import { pollForProcessingImage } from '../../lib/cloudinary';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

const CldImage = props => {
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

  interface ImageProps {
    alt: string;
    blurDataURL?: string;
    src: string;
  }

  const imageProps: ImageProps = {
    alt: props.alt,
    src: props.src
  };

  Object.keys(props)
    .filter(key => !CLD_OPTIONS.includes(key))
    .forEach(key => imageProps[key] = props[key]);

  const defaultImgKey = Object.keys(imageProps).map(key => `${key}:${imageProps[key]}`).join(';');
  const [imgKey, setImgKey] = useState(defaultImgKey);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  interface CldOptions {
    rawTransformations?: string[];
  }

  const cldOptions: CldOptions = {};

  CLD_OPTIONS.forEach(key => {
    if ( props[key] ) {
      cldOptions[key] = props[key] || undefined;
    }
  });

  // Try to preserve the original transformations from the Cloudinary URL passed in
  // to the component. This only works if the URL has a version number on it and otherwise
  // will fail to load

  if (props.preserveTransformations) {
    try {
      const transformations = getTransformations(props.src);
      cldOptions.rawTransformations = [...transformations.flat(), ...(props.rawTransformations || [])];
    } catch(e) {
      console.warn(`Failed to preserve transformations: ${(e as Error).message}`)
    }
  }

  /**
   * handleOnError
   */

  async function handleOnError(options) {
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
