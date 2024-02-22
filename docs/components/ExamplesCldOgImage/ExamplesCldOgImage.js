import { CldImage } from '../../../next-cloudinary/dist';
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../../../next-cloudinary/src/constants/sizes';

const ExamplesCldOgImage = ({ ...props }) => {
  return (
    <CldImage
      width={OG_IMAGE_WIDTH}
      height={OG_IMAGE_HEIGHT}
      crop={{
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        type: 'fill',
        gravity: 'center',
        source: true
      }}
      sizes="100vw"
      alt=""
      {...props}
    />
  )
}

export default ExamplesCldOgImage;