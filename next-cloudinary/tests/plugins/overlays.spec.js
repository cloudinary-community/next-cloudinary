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
  describe('Text Overlays', () => {
    it('should add a text overlay configured by overlay object', () => {
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


      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });

    it('should add a text overlay by overlay object text string', () => {
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

      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });

    it('should add a text overlay by text string', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const { color, fontFamily, fontSize, fontWeight } = DEFAULT_TEXT_OPTIONS;
      const text = 'Next Cloudinary';

      const options = {
        text
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}:${encodeURIComponent(text)},co_${color}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });

    it('should add a text overlay by text object', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const color = 'white';
      const fontFamily = 'Source Sans Pro';
      const fontSize = 200;
      const fontWeight = 'bold';
      const text = 'Next Cloudinary';
      const letterSpacing = 10;
      const lineSpacing = 20;

      const options = {
        text: {
          color,
          fontFamily,
          fontSize,
          fontWeight,
          text,
          letterSpacing,
          lineSpacing
        }
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}_letter_spacing_${letterSpacing}_line_spacing_${lineSpacing}:${encodeURIComponent(text)},co_${color}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });

    it('should add a stroke to text', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const color = 'white';
      const fontFamily = 'Source Sans Pro';
      const fontSize = 200;
      const fontWeight = 'bold';
      const text = 'Next Cloudinary';
      const border = '20px_solid_blue';
      const stroke = true;

      const options = {
        text: {
          color,
          fontFamily,
          fontSize,
          fontWeight,
          text,
          border,
          stroke
        }
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_text:${encodeURIComponent(fontFamily)}_${fontSize}_${fontWeight}_stroke:${encodeURIComponent(text)},co_${color},bo_${border}/fl_layer_apply,fl_no_overflow/${TEST_PUBLIC_ID}`);
    });
  });
});