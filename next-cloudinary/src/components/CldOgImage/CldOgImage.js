const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;

import { constructCloudinaryUrl } from '../../lib/cloudinary';

const CldOgImage = ({ excludeTags = [], twitterCard = 'summary_large_image', ...props }) => {
  const options = {
    ...props,
    width: props.width || IMAGE_WIDTH,
    height: props.height || IMAGE_HEIGHT,
    crop: props.crop || 'fill',
    gravity: props.gravity || 'center'
  }

  const ogImageUrl = constructCloudinaryUrl({
    options
  });

  return (
    <>
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:image:width" content={options.width} />
      <meta property="og:image:height" content={options.height} />

      {/* Required for summary_large_image, exclude vai excludeTags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image */}

      {!excludeTags.includes('twitter:title') && (
        <meta property="twitter:title" content="" />
      )}

      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:image" content={ogImageUrl} />
    </>
  );
}

export default CldOgImage;