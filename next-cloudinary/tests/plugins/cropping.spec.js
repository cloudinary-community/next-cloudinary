import { Cloudinary } from '@cloudinary/url-gen';

import * as cropping from '../../src/plugins/cropping';

const { plugin } = croppingPlugin

const cld = new Cloudinary({
  cloud: {
    cloudName: 'test-cloud-name'
  }
});

describe('Plugins', () => {
  describe('Cropping', () => {
    it('should return a Cloudinary URL with advanced options', () => {

      const imageProps = {
        width: '987',
        height: '1481',
        src: 'images/woman-headphones',
        sizes: '100vw',
      }

      const options = {
        src: 'images/woman-headphones',
        width: 640,
      }

      const cldOptions = {
        crop: 'crop',
        gravity: 'faces',
      };

      const result = Cropping({ ...imageProps, options }, cldOptions);

      expect(result).toBe('https://res.cloudinary.com/test-cloud/image/upload/c_crop,w_987,h_1481,g_faces/v1/images/woman-headphones')
    });
  });
});
