import React from 'react';
import Head from 'next/head';
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../../constants/analytics';
import { CldImageProps } from '../CldImage/CldImage';

const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;

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
    height: props.height || IMAGE_HEIGHT,
    src: props.src,
    width: props.width || IMAGE_WIDTH,
  }

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

  const ogImageUrl = constructCloudinaryUrl({
    options,
    config: {
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      }
    },
    analytics: {
      sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: NEXT_CLOUDINARY_VERSION,
      techVersion: NEXT_VERSION,
      feature: ''
    }
  });

  // We need to include the tags within the Next.js Head component rather than
  // direcly adding them inside of the Head otherwise we get unexpected results

    return (
    <Head>
      <meta key={metaKeys['og:image']} property="og:image" content={ogImageUrl} />
      <meta key={metaKeys['og:image:secure_url']} property="og:image:secure_url" content={ogImageUrl} />
      <meta key={metaKeys['og:image:width']} property="og:image:width" content={`${options.width}`} />
      <meta key={metaKeys['og:image:height']} property="og:image:height" content={`${options.height}`} />

      {alt && (
        <meta key={metaKeys['og:image:alt']} property="og:image:alt" content={alt} />
      )}

      {/* Required for summary_large_image, exclude vai excludeTags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image */}

      {!excludeTags.includes('twitter:title') && (
        <meta key={metaKeys['twitter:title']} property="twitter:title" content={twitterTitle || ' '} />
      )}

      <meta key={metaKeys['twitter:card']} property="twitter:card" content={TWITTER_CARD} />
      <meta key={metaKeys['twitter:image']} property="twitter:image" content={ogImageUrl} />
    </Head>
  );
}

export default CldOgImage;
