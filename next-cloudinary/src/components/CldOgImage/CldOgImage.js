const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;

import { constructCloudinaryUrl } from '../../lib/cloudinary';

const CldOgImage = props => {
  const { width = IMAGE_WIDTH, height = IMAGE_HEIGHT, excludeTags = [], ...options } = props;

  const ogImageUrl = constructCloudinaryUrl({
    options: {
      width,
      height,
      src: props.src,
      crop: props.crop || 'fill',
      gravity: props.gravity || 'center',
      ...options
    }
  });

  return (
    <>
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:secure_url" content={ogImageUrl} />
      <meta property="og:image:width" content={width} />
      <meta property="og:image:height" content={height} />

      {/* Required for summary_large_image, exclude vai excludeTags */}
      {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image */}

      {!excludeTags.includes('twitter:title') && (
        <meta property="twitter:title" content="" />
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={ogImageUrl} />
    </>
  );
}

export default CldOgImage;