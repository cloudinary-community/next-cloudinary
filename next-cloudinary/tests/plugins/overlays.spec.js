import { Cloudinary } from '@cloudinary/url-gen';

import * as overlaysPlugin from '../../src/plugins/overlays';

const { plugin, DEFAULT_TEXT_OPTIONS } = overlaysPlugin

const cld = new Cloudinary({
  cloud: {
    cloudName: 'test-cloud-name'
  }
});

const TEST_PUBLIC_ID = 'test-public-id';

describe('Plugins', () => {
  describe('Overlays', () => {
    it('should add a text overlay configured by object', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const color = 'white';
      const fontFamily = 'Source Sans Pro';
      const fontSize = 200;
      const fontWeight = 'bold';
      const text = 'Next Cloudinary';

      const options = {
        overlays: [{
          text: {
            color,
            fontFamily,
            fontSize,
            fontWeight,
            text
          }
        }]
      }

      plugin({
        cldImage,
        options
      });


      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color}/fl_layer_apply/${TEST_PUBLIC_ID}`);
    });

    it('should add a text overlay by string', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const { color, fontFamily, fontSize, fontWeight } = DEFAULT_TEXT_OPTIONS;
      const text = 'Next Cloudinary';

      const options = {
        overlays: [{
          text
        }]
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color}/fl_layer_apply/${TEST_PUBLIC_ID}`);
    });
  });
});