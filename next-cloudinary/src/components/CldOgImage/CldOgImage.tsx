import React from 'react';
import Head from 'next/head';
import type { ImageOptions } from '@cloudinary-util/url-loader';

import { CldImageProps } from '../CldImage/CldImage';
import { getCldImageUrl } from '../../helpers/getCldImageUrl';
import { OG_IMAGE_WIDTH, OG_IMAGE_WIDTH_RESIZE, OG_IMAGE_HEIGHT } from '../../constants/sizes';

const TWITTER_CARD = 'summary_large_image';

export type CldOgImageProps = CldImageProps & {
  excludeTags?: Array<string>;
  keys?: object;
  twitterTitle?: string;
}

const CldOgImage = ({ excludeTags = [], twitterTitle, keys = {}, ...props }: CldOgImageProps) => {
  const { alt } = props;

  const options: ImageOptions = {
    ...props,
    crop: props.crop || 'fill',
    gravity: props.gravity || 'center',
    height: props.height || OG_IMAGE_HEIGHT,
    src: props.src,
    width: props.width || OG_IMAGE_WIDTH,
    widthResize: props.width || OG_IMAGE_WIDTH_RESIZE
  }

  let width = typeof options.width === 'string' ? parseInt(options.width) : options.width;
  let height = typeof options.height === 'string' ? parseInt(options.height) : options.height;

  // Resize the height based on the widthResize property

  if ( typeof height === 'number' && typeof width === 'number' ) {
    height = ( OG_IMAGE_WIDTH_RESIZE / width ) * height;
  }

  width = OG_IMAGE_WIDTH_RESIZE;

  // Render the final URLs. We use two different format versions to deliver
  // webp for Twitter as it supports it (and we can control with tags) where
  // other platforms may not support webp, so we deliver jpg

  const ogImageUrl = getCldImageUrl({
    ...options,
    format: props.format || 'jpg',
  });

  const twitterImageUrl = getCldImageUrl({
    ...options,
    format: props.format || 'webp',
  });

  const metaKeys = {
    'og:image': 'og-image',
    'og:image:secure_url': 'og-image-secureurl',
    'og:image:width': 'og-image-width',
    'og:image:height': 'og-image-height',
    'og:image:alt': 'og-image-alt',
    'twitter:title': 'twitter-title',
    'twitter:card': 'twitter-card',
    'twitter:image': 'twitter-image',
    ...keys
  }

  // We need to include the tags within the Next.js Head component rather than
  // direcly adding them inside of the Head otherwise we get unexpected results

    return (
    <Head>
      <meta key={metaKeys['og:image']} property="og:image" content={ogImageUrl} />
      <meta key={metaKeys['og:image:secure_url']} property="og:image:secure_url" content={ogImageUrl} />
      <meta key={metaKeys['og:image:width']} property="og:image:width" content={`${width}`} />
      <meta key={metaKeys['og:image:height']} property="og:image:height" content={`${height}`} />

      {alt && (
        <meta key={metaKeys['og:image:alt']} property="og:image:alt" content={alt} />
      )}

      {/* Required for summary_large_image, exclude vai excludeTags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image */}

      {!excludeTags.includes('twitter:title') && (
        <meta key={metaKeys['twitter:title']} property="twitter:title" content={twitterTitle || ' '} />
      )}

      <meta key={metaKeys['twitter:card']} property="twitter:card" content={TWITTER_CARD} />
      <meta key={metaKeys['twitter:image']} property="twitter:image" content={twitterImageUrl} />
    </Head>
  );
}

export default CldOgImage;
