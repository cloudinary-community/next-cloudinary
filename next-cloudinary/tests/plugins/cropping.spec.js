import { Cloudinary } from '@cloudinary/url-gen';

import * as croppingPlugin from '../../src/plugins/cropping';

const { plugin } = croppingPlugin

const cld = new Cloudinary({
  cloud: {
    cloudName: 'test-cloud-name'
  }
});

const TEST_PUBLIC_ID = 'test-public-id';

describe('Cropping plugin', () => {
  it('should apply a crop and gravity to a URL', () => {
    const cldImage = cld.image(TEST_PUBLIC_ID);
    const options = {
      width: 100,
      height: 100,
      crop: 'crop',
      gravity: 'auto'
    };
    plugin({ cldImage, options });
    expect(cldImage.toURL()).toContain(`c_${options.crop},w_${options.width},h_${options.height},g_${options.gravity}/${TEST_PUBLIC_ID}`);
  });

  it('should apply a gravity of auto by default if not set explicitly', () => {
    const cldImage = cld.image(TEST_PUBLIC_ID);
    const options = {
      width: 100,
      height: 100,
      crop: 'fill'
    };
    plugin({ cldImage, options });
    expect(cldImage.toURL()).toContain(`c_${options.crop},w_${options.width},h_${options.height},g_auto/${TEST_PUBLIC_ID}`);
  });
});
