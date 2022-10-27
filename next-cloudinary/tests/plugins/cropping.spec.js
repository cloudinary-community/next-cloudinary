import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugin from '../../src/plugins/cropping';

const { plugin } = croppingPlugin

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
        crop: 'crop',
        width: 100,
        height: 100
      }

      plugin({
        cldImage,
        cldOptions
      });

      expect(cldImage.toURL()).toContain(`${cldOptions.crop}_${cldOptions.width}_${cldOptions.height}/${TEST_PUBLIC_ID}`);
    });

    it('should apply an array of crops to the end of a Cloudinary URL', () => {

      const cldImage = cld.image(TEST_PUBLIC_ID);

      const cldOptions = {
        crop: [
          'crop',
          'fit'
        ],
        width: [
          100,
          200
        ],
        height: [
          100,
          200
        ]
      }

      plugin({
        cldImage,
        cldOptions
      });

      expect(cldImage.toURL()).toContain(`${cldOptions.crop[0]}_${cldOptions.width[0]}_${cldOptions.height[0]}/${cldOptions.crop[1]}_${cldOptions.width[1]}_${cldOptions.height[1]}/${TEST_PUBLIC_ID}`);
    })
  });
});
