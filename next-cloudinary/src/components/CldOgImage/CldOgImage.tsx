import Head from 'next/head';
import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../../constants/analytics';

const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;

const TWITTER_CARD = 'summary_large_image';

const CldOgImage = ({ excludeTags = [] as string[], twitterTitle, ...props }) => {
  const options = {
    ...props,
    alt: props.alt,
    crop: props.crop || 'fill',
    gravity: props.gravity || 'center',
    height: props.height || IMAGE_HEIGHT,
    src: props.src,
    width: props.width || IMAGE_WIDTH,
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
    // @ts-ignore
    <Head>
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:image:width" content={options.width} />
      <meta property="og:image:height" content={options.height} />

      {options.alt && (
        <meta property="og:image:alt" content={options.alt} />
      )}

      {/* Required for summary_large_image, exclude vai excludeTags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image */}

      {!excludeTags.includes('twitter:title') && (
        <meta property="twitter:title" content={twitterTitle || ' '} />
      )}

      <meta property="twitter:card" content={TWITTER_CARD} />
      <meta property="twitter:image" content={ogImageUrl} />
    </Head>
  );
}

export default CldOgImage;