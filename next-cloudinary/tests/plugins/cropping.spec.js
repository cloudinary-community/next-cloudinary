import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugins from '../../src/plugins/cropping';

const { plugin } =  croppingPlugins

const cld = new Cloudinary({
  cloud: {
    cloudName: 'test-cloud-name'
  }
});

const TEST_PUBLIC_ID = 'test-public-id';

describe('Plugins', () => {
  describe('Cropping', () => {
    it('should apply a single crop to the end of a Cloudinary URL', () => {

      const cldImage = cld.image(TEST_PUBLIC_ID);

      const cldOptions = {
        crop: 'scale'
      }

      plugin({
        cldImage,
        cldOptions
      });

      expect(cldImage.toURL()).toContain(`${cldOptions.crop}/${TEST_PUBLIC_ID}`);
    });

    it('should apply an array of crops to the end of a Cloudinary URL', () => {

      const cldImage = cld.image(TEST_PUBLIC_ID);

      const cldOptions = {
        crop: ['scale', 'crop']
      }

      plugin({
        cldImage,
        cldOptions
      });

      expect(cldImage.toURL()).toContain(`${cldOptions.crop.join(',')}/${TEST_PUBLIC_ID}`);
    })
  });
});
