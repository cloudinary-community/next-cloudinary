import Image from 'next/future/image';

import { createPlaceholderUrl, getPublicId } from '../../lib/cloudinary';
import { cloudinaryLoader, transformationPlugins } from '../../loaders/cloudinary-loader';

const CldImage = props => {

  const CLD_OPTIONS = [];

  transformationPlugins.forEach(({ props = [] }) => {
    props.forEach(prop => {
      if ( CLD_OPTIONS.includes(prop) ) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLD_OPTIONS.push(prop);
    });
  })

  // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps = {};

  Object.keys(props)
    .filter(key => !CLD_OPTIONS.includes(key))
    .forEach(key => imageProps[key] = props[key]);

  // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  const cldOptions = {};

  CLD_OPTIONS.forEach(key => {
    if ( props[key] ) {
      cldOptions[key] = props[key];
    }
  });

  // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  //
  // We need to do this logic here as we potentially need to mutate
  // an Image component prop as opposed to simply the URL
  //
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if ( imageProps.placeholder ) {
    const publicId = getPublicId(props.src);

    imageProps.blurDataURL = createPlaceholderUrl({
      src: publicId,
      placeholder: props.placeholder
    });

    if ( imageProps.placeholder !== 'blur' ) {
      imageProps.placeholder = 'blur';
    }
  }

  return (
    <Image
      {...imageProps}
      loader={(options) => cloudinaryLoader({ ...imageProps, options }, cldOptions)}
    />
  );
}

export default CldImage;