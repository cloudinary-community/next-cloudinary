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
  describe('Image Overlays', () => {

    it('should add a remote image overlay configured by overlay object', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const options = {
        overlays: [{
          url: 'https://user-images.githubusercontent.com/1045274/199872380-ced2b84d-fce4-4fc9-9e76-48cb4a7fb35f.png'
        }]
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_fetch:aHR0cHM6Ly91c2VyLWltYWdlcy5naXRodWJ1c2VyY29udGVudC5jb20vMTA0NTI3NC8xOTk4NzIzODAtY2VkMmI4NGQtZmNlNC00ZmM5LTllNzYtNDhjYjRhN2ZiMzVmLnBuZw%3D%3D`);
    });

    it('should apply effects to an overlay by public ID', () => {
      const cldImage = cld.image(TEST_PUBLIC_ID);

      const publicId = 'images/my-cool-image'
      const width = 100;
      const height = 200;
      const shear = '40:0';
      const opacity = '50';

      const options = {
        overlays: [{
          publicId,
          effects: [
            {
              width,
              height,
            },
            {
              shear,
              opacity,
            }
          ]
        }]
      }

      plugin({
        cldImage,
        options
      });

      expect(cldImage.toURL()).toContain(`l_${publicId.replace(/\//g, ':')},w_${width},h_${height},e_shear:${shear},o_${opacity}/fl_layer_apply,fl_no_overflow`);
    });

  })
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