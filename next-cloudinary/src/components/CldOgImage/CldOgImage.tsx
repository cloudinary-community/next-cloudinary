import Head from 'next/head';

const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;

import { constructCloudinaryUrl } from '../../lib/cloudinary';

const TWITTER_CARD = 'summary_large_image';

const CldOgImage = ({ excludeTags = [], twitterTitle, ...props }) => {
  const options = {
    ...props,
    width: props.width || IMAGE_WIDTH,
    height: props.height || IMAGE_HEIGHT,
    crop: props.crop || 'fill',
    gravity: props.gravity || 'center',
    alt: props.alt
  }

  const ogImageUrl = constructCloudinaryUrl({
    options
  });

  // We need to include the tags within the Next.js Head component rather than
  // direcly adding them inside of the Head otherwise we get unexpected results

    return (
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