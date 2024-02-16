import { CldImage } from '../../../next-cloudinary/dist';
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../../../next-cloudinary/src/constants/sizes';

const ExamplesCldOgImage = ({ ...props }) => {
  return (
    <CldImage
      width={OG_IMAGE_WIDTH}
      height={OG_IMAGE_HEIGHT}
      baseCrop="fill"
      baseGravity="center"
      baseHeight={OG_IMAGE_HEIGHT}
      baseWidth={OG_IMAGE_WIDTH}
      sizes="100vw"
      alt=""
      {...props}
    />
  )
}

export default ExamplesCldOgImage;