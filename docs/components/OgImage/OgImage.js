import { CldOgImage } from '../../../next-cloudinary';

const OgImage = ({ title, ...props }) => {
  return (
    <CldOgImage
      src={`${process.env.IMAGES_DIRECTORY}/next-cloudinary-social-background`}
      overlays={[
        {
          width: 2000,
          crop: 'fit',
          position: {
            y: -160
          },
          text: {
            color: 'white',
            fontFamily: 'Source Sans Pro',
            fontSize: 200,
            fontWeight: 'black',
            text: title,
            alignment: 'center',
            lineSpacing: -50
          }
        },
        {
          publicId: 'images/cloudinary-white',
          position: {
            x: -200,
            y: 180,
          },
        },
        {
          publicId: 'images/nextjs-white',
          position: {
            x: 350,
            y: 180,
          },
        },
        {
          position: {
            y: 320
          },
          text: {
            color: 'white',
            fontFamily: 'Source Sans Pro',
            fontSize: 60,
            fontWeight: 'bold',
            text: 'next-cloudinary.spacejelly.dev'
          }
        }
      ]}
      {...props}
    />
  )
}

export default OgImage;