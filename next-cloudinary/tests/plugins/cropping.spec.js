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
  it('should apply the correct transformation string', () => {
    const cldImage = cld.image(TEST_PUBLIC_ID);
    const cldOptions = {
      crop: 'crop',
      gravity: 'auto'
    };
    const options = {
      width: 100,
      height: 100
    };
    plugin({ cldImage, options, cldOptions });
    expect(cldImage.toURL()).toContain('c_crop,g_auto,w_100');
  });
});
