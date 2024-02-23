import { CldOgImage } from '../../../next-cloudinary';

const OgImage = ({ title, ...props }) => {
  return (
    <CldOgImage
      src={`${process.env.IMAGES_DIRECTORY}/next-cloudinary-social-background`}
      overlays={[
        {
          width: 1000,
          crop: 'fit',
          position: {
            y: -80
          },
          text: {
            color: 'white',
            fontFamily: 'Source Sans Pro',
            fontSize: 100,
            fontWeight: 'black',
            text: title,
            alignment: 'center',
            lineSpacing: -25
          }
        },
        {
          publicId: 'images/cloudinary-white',
          height: 60,
          position: {
            x: -100,
            y: 90,
          },
        },
        {
          publicId: 'images/nextjs-white',
          height: 38,
          position: {
            x: 175,
            y: 90,
          },
        },
        {
          position: {
            y: 160
          },
          text: {
            color: 'white',
            fontFamily: 'Source Sans Pro',
            fontSize: 30,
            fontWeight: 'bold',
            text: 'next.cloudinary.dev'
          }
        }
      ]}
      {...props}
    />
  )
}

export default OgImage;