import React, { useState, useCallback, forwardRef, SyntheticEvent } from 'react';
import Image, { ImageProps } from 'next/image';
import { getTransformations } from '@cloudinary-util/util';
import { transformationPlugins } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions } from '@cloudinary-util/url-loader';

import { pollForProcessingImage } from '../../lib/cloudinary';
import { getCldImageUrl } from '../../helpers/getCldImageUrl';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

export type CldImageProps = Omit<ImageProps, 'src' | 'quality'> & ImageOptions & {
  config?: ConfigOptions;
  preserveTransformations?: boolean;
  src: string;
  unoptimized?: boolean;
};

const CldImage = forwardRef<HTMLImageElement, CldImageProps>(function CldImage(props, ref) {
  let hasThrownError = false;

  const CLD_OPTIONS = [
    'deliveryType',
    'preserveTransformations',
    'strictTransformations',
    'assetType',
  ];

  transformationPlugins.forEach(({ props }: { props: Record<string, unknown> }) => {
    const pluginProps = Object.keys(props);
    pluginProps.forEach(prop => {
      if ( CLD_OPTIONS.includes(prop) ) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  });

  // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps: ImageProps = {
    alt: props.alt,
    src: props.src,
  };

  (Object.keys(props) as Array<keyof typeof props>)
    .filter(key => typeof key === 'string' && !CLD_OPTIONS.includes(key))
    .forEach(key => imageProps[key as keyof ImageProps] = props[key]);

  const defaultImgKey = (Object.keys(imageProps) as Array<keyof typeof imageProps>).map(key => `${key}:${imageProps[key]}`).join(';');
  const [imgKey, setImgKey] = useState(defaultImgKey);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  type CldOptions = Omit<ImageOptions, 'src'>;

  const cldOptions: CldOptions = {};

  CLD_OPTIONS.forEach((key) => {
    const prop = props[key as keyof ImageOptions];
    if ( prop ) {
      cldOptions[key as keyof CldOptions] = prop || undefined;
    }
  });

  // Try to preserve the original transformations from the Cloudinary URL passed in
  // to the component. This only works if the URL has a version number on it and otherwise
  // will fail to load

  if (props.preserveTransformations) {
    try {
      const transformations = getTransformations(props.src).map(t => t.join(','));
      cldOptions.rawTransformations = [...transformations.flat(), ...(props.rawTransformations || [])];
    } catch(e) {
      console.warn(`Failed to preserve transformations: ${(e as Error).message}`)
    }
  }

  // The unoptimized flag is intended to remove all optimizations including quality, format, and sizing
  // via responsive sizing. When passing this in, it also prevents the `loader` from running, thus
  // breaking this component. This rewrites the `src` to construct a fully formed Cloudinary URL
  // that also disables format and quality transformations, to deliver it as unoptimized
  // See about unoptimized not working with loader: https://github.com/vercel/next.js/issues/50764

  const IMAGE_OPTIONS: { unoptimized?: boolean } = (process.env.__NEXT_IMAGE_OPTS || {}) as unknown as object;

  if ( props.unoptimized === true || IMAGE_OPTIONS?.unoptimized === true ) {
    imageProps.src = getCldImageUrl({
      ...cldOptions,
      width: imageProps.width,
      height: imageProps.height,
      src: imageProps.src as string,
      format: 'default',
      quality: 'default',
    }, props.config);
  }

  /**
   * handleOnError
   */

  async function onError(options: SyntheticEvent<HTMLImageElement, Event>) {
    let pollForImage = true;

    // The onError function should never fire more than once. The use case for tracking it
    // at all outside of the standard Next Image flow is for scenarios like when Cloudinary
    // is processing an image where we want to try to update the UI upon completion.
    // If this fires a second time, it is likely because of another issue, which will end
    // up triggering an infinite loop if the resulting image keeps erroring and
    // this function sets a key using the current time to force refresh the UI

    if ( hasThrownError ) return;

    hasThrownError = true;

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
      ref={ref}
    />
  );
});

export default CldImage;
