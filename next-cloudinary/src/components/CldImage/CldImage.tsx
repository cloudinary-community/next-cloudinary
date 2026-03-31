import React, { useState, useCallback, forwardRef, SyntheticEvent, CSSProperties } from 'react';
import Image, { ImageProps } from 'next/image';
import { pollForProcessingImage } from '@cloudinary-util/util';
import { transformationPlugins } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions } from '@cloudinary-util/url-loader';

import { getCldImageUrl } from '../../helpers/getCldImageUrl';

import { cloudinaryLoader } from '../../loaders/cloudinary-loader';

export type CldImageProps = Omit<ImageProps, 'src' | 'quality'> & ImageOptions & {
  config?: ConfigOptions;
  src: string;
  unoptimized?: boolean;
};

/**
 * Generates a shimmer placeholder SVG with enhanced visibility
 */
const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#e0e0e0" offset="0%" />
        <stop stop-color="#f0f0f0" offset="20%" />
        <stop stop-color="#ffffff" offset="50%" />
        <stop stop-color="#f0f0f0" offset="80%" />
        <stop stop-color="#e0e0e0" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#e8e8e8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
  </svg>`;

/**
 * Converts string to base64
 */
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const CldImage = forwardRef<HTMLImageElement, CldImageProps>(function CldImage(props, ref) {
  let hasThrownError = false;

  // Add props here that are intended to only be used for
  // Cloudinary URL construction to avoid them being forwarded
  // to the DOM

  const CLD_OPTIONS = [
    'assetType',
    'config',
    'deliveryType',
    'strictTransformations',
  ];

  // Loop through all of the props available on the transformation plugins and verify
  // that we're not accientally applying the same prop twice

  // We're also using those props to push into CLD_OPTIONS which helps us filter what
  // props are applied to the underlaying Image component vs what's being sent
  // to Cloudinary URL construction

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
  const [isPolling, setIsPolling] = useState(false);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  type CldOptions = Omit<ImageOptions, 'src'>;

  const cldOptions: CldOptions = {};

  CLD_OPTIONS.forEach((key) => {
    const prop = props[key as keyof ImageOptions];
    if ( prop ) {
      // @ts-expect-error
      cldOptions[key as keyof CldOptions] = prop;
    }
  });

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

    // Immediately hide the image DOM element to prevent broken icon from appearing
    // This runs synchronously before setState queues re-render
    const img = options.target as HTMLImageElement;
    img.style.opacity = '0';
    img.style.visibility = 'hidden';

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

    // Set polling state to show placeholder (triggers shimmer overlay)
    setIsPolling(true);

    const result = await pollForProcessingImage({ src: img.src })

    // Reset polling state
    setIsPolling(false);

    if ( typeof result.error === 'string' && process.env.NODE_ENV === 'development' ) {
      console.error(`[CldImage] Failed to load image ${props.src}: ${result.error}`)
    }

    if ( result.success ) {
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

  // Generate shimmer placeholder for polling state
  const width = typeof imageProps.width === 'number' ? imageProps.width : 600;
  const height = typeof imageProps.height === 'number' ? imageProps.height : 400;
  const shimmerDataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;

  // If user hasn't provided a placeholder and we're polling, use shimmer
  const effectivePlaceholder = isPolling && !imageProps.placeholder 
    ? shimmerDataUrl 
    : imageProps.placeholder;

  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  };

  const imageStyle: CSSProperties = {
    ...(typeof imageProps.style === 'object' ? imageProps.style : {}),
    visibility: isPolling ? 'hidden' : 'visible',
    opacity: isPolling ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  };

  const placeholderStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: isPolling ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    pointerEvents: 'none',
    zIndex: 1,
    background: 'linear-gradient(90deg, #d0d0d0 0%, #e0e0e0 20%, #f0f0f0 50%, #e0e0e0 80%, #d0d0d0 100%)',
    backgroundSize: '200% 100%',
    animation: isPolling ? 'shimmer 1.5s ease-in-out infinite' : 'none',
  };

  // Hide broken image icon by making container overflow hidden and hiding alt text
  const imageContainerStyle: CSSProperties = {
    ...containerStyle,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  };

  // Inject keyframes for shimmer animation
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
      <div style={imageContainerStyle}>
        <ResolvedImage
          key={imgKey}
          {...imageProps}
          style={imageStyle}
          loader={(loaderOptions) => cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig: props.config })}
          onError={handleOnError}
          ref={ref}
        />
        {isPolling && (
          <div style={placeholderStyle} />
        )}
      </div>
    </>
  );
});

export default CldImage;