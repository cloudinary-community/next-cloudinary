import { cloudinaryLoader } from '../../src/loaders/cloudinary-loader';

const cldConfig = {
  cloud: {
    cloudName: 'test-cloud'
  },
}

describe('Cloudinary Loader', () => {
  describe('cloudinaryLoader', () => {
    it('should return a Cloudinary URL with basic features', async () => {
      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'images/turtle',
        width: '960',
      }

      const options = {
        quality: 75,
        src: 'images/turtle',
        width: 960,
      }

      const cldOptions = {};

      const result = cloudinaryLoader({ ...imageProps, options }, cldOptions, cldConfig);

      expect(result).toBe('https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/images/turtle')
    });

    it('should return a Cloudinary URL with advanced options', () => {
      const imageProps = {
        width: '987',
        height: '1481',
        src: 'images/woman-headphones',
        sizes: '100vw',
      }

      const options = {
        src: 'images/woman-headphones',
        width: 640
      }

      const cldOptions = {
        removeBackground: true,
        crop: 'thumb',
        gravity: 'faces',
        tint: '40:253f8c',
        underlays: [
            {
                publicId: 'images/city-skyline',
                width: 987,
                height: 987,
                crop: 'fill'
            }
        ]
      };

      const result = cloudinaryLoader({ ...imageProps, options }, cldOptions);

      expect(result).toBe('https://res.cloudinary.com/test-cloud/image/upload/e_background_removal/c_thumb,w_987,h_1481,g_faces/e_tint:40:253f8c/u_images:city-skyline,w_987,h_987,c_fill/fl_layer_apply/f_auto/q_auto/v1/images/woman-headphones')
    });

    it('should return a Cloudinary URL with fetch features', async () => {
      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '960',
        deliveryType: 'fetch'
      }

      const cldOptions = {};

      const result = cloudinaryLoader(imageProps, cldOptions, cldConfig);

      expect(result).toBe('https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_960/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg')
    });
  })
});



