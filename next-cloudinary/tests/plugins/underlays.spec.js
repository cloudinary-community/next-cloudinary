import { Cloudinary } from '@cloudinary/url-gen';

import * as underlaysPlugin from '../../src/plugins/underlays';

const { plugin, DEFAULT_TEXT_OPTIONS } = underlaysPlugin

const cld = new Cloudinary({
  cloud: {
    cloudName: 'test-cloud-name'
  }
});

const TEST_PUBLIC_ID = 'test-public-id';

describe('Plugins', () => {
  describe('Underlays', () => {
    it('should add an underlay configured by object', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const publicId = 'images/galaxy';
      const width = 1920;
      const height = 1200;
      const crop = 'fill';

      const options = {
        underlays: [{
          publicId,
          width,
          height,
          crop,
        }]
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`u_${publicId.replace(/\//g, ':')},w_${width},h_${height},c_${crop}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });

    it('should add an underlay by string', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const publicId = 'images/galaxy';
      const width = 1920;
      const height = 1200;
      const crop = 'fill';

      const options = {
        underlay: publicId
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`u_${publicId.replace(/\//g, ':')},c_${crop}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });
  });
});