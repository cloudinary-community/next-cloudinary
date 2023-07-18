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

      const loaderOptions = {
        quality: 75,
        src: 'images/turtle',
        width: 960,
      }

      const cldOptions = {};

      const result = cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig });

      expect(result).toContain('https://res.cloudinary.com/test-cloud/image/upload/c_limit,w_960/f_auto/q_auto/v1/images/turtle')
    });

    it('should return a Cloudinary URL with advanced options', () => {
      const imageProps = {
        width: '987',
        height: '1481',
        src: 'images/woman-headphones',
        sizes: '100vw',
      }

      const loaderOptions = {
        src: 'images/woman-headphones',
        width: 987
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

      const result = cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig });

      expect(result).toContain('https://res.cloudinary.com/test-cloud/image/upload/e_background_removal/c_thumb,w_987,h_1481,g_faces/e_tint:40:253f8c/u_images:city-skyline,w_987,h_987,c_fill/fl_layer_apply,fl_no_overflow/f_auto/q_auto/v1/images/woman-headphones')
    });

    it('should return a Cloudinary URL with fetch features', async () => {
      const loaderOptions = {};

      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '960',
        deliveryType: 'fetch'
      }

      const cldOptions = {};

      const result = cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig });

      expect(result).toContain('https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_960/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg')
    });

    it('should return responsive images', async () => {
      const imageProps = {
        height: '2724',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '4096',
        deliveryType: 'fetch'
      }

      const cldOptions = {};

      // The resulting widths should only be resized from imageProps if the value is smaller, to avoid upscaling an image
      const loaderOptions1 = { width: 2048 };
      const result1 = cloudinaryLoader({ loaderOptions: loaderOptions1, imageProps, cldOptions, cldConfig });
      expect(result1).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/c_scale,w_${loaderOptions1.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions2 = { width: 3840 };
      const result2 = cloudinaryLoader({ loaderOptions: loaderOptions2, imageProps, cldOptions, cldConfig });
      expect(result2).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/c_scale,w_${loaderOptions2.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions3 = { width: 640 };
      const result3 = cloudinaryLoader({ loaderOptions: loaderOptions3, imageProps, cldOptions, cldConfig });
      expect(result3).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/c_scale,w_${loaderOptions3.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)
    });

    it('should return responsive images without upscaling for smaller images', async () => {
      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '960',
        deliveryType: 'fetch'
      }

      const cldOptions = {};

      // The resulting widths should only be resized from imageProps if the value is smaller, to avoid upscaling an image

      const loaderOptions1 = { width: 2048 };
      const result1 = cloudinaryLoader({ loaderOptions: loaderOptions1, imageProps, cldOptions, cldConfig });
      expect(result1).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions2 = { width: 3840 };
      const result2 = cloudinaryLoader({ loaderOptions: loaderOptions2, imageProps, cldOptions, cldConfig });
      expect(result2).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions3 = { width: 640 };
      const result3 = cloudinaryLoader({ loaderOptions: loaderOptions3, imageProps, cldOptions, cldConfig });
      expect(result3).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_limit,w_${imageProps.width}/c_scale,w_${loaderOptions3.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)
    });

    it('should return a responsive images with height when crop is not limit without upscaling', async () => {
      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '960',
        deliveryType: 'fetch',
      }

      const cldOptions = {
        crop: 'fill'
      };

      // The resulting widths should only be resized from imageProps if the value is smaller, to avoid upscaling an image

      const loaderOptions1 = { width: 2048 };
      const result1 = cloudinaryLoader({ loaderOptions: loaderOptions1, imageProps, cldOptions, cldConfig });
      expect(result1).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions2 = { width: 3840 };
      const result2 = cloudinaryLoader({ loaderOptions: loaderOptions2, imageProps, cldOptions, cldConfig });
      expect(result2).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions3 = { width: 640 };
      const result3 = cloudinaryLoader({ loaderOptions: loaderOptions3, imageProps, cldOptions, cldConfig });
      expect(result3).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/c_scale,w_${loaderOptions3.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)
    });

    it('should add any resizing after any effects are added', async () => {
      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg',
        width: '960',
        deliveryType: 'fetch',
      }

      const cldOptions = {
        crop: 'fill',
        overlays: [{
          url: 'https://user-images.githubusercontent.com/1045274/199872380-ced2b84d-fce4-4fc9-9e76-48cb4a7fb35f.png'
        }]
      };

      const urlBufer = Buffer.from(cldOptions.overlays[0].url);
      const urlBase64 = urlBufer.toString('base64');
      const urlParam = encodeURIComponent(urlBase64);

      // The resulting widths should only be resized from imageProps if the value is smaller, to avoid upscaling an image

      const loaderOptions1 = { width: 2048 };
      const result1 = cloudinaryLoader({ loaderOptions: loaderOptions1, imageProps, cldOptions, cldConfig });
      expect(result1).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/l_fetch:${urlParam}/fl_layer_apply,fl_no_overflow/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions2 = { width: 3840 };
      const result2 = cloudinaryLoader({ loaderOptions: loaderOptions2, imageProps, cldOptions, cldConfig });
      expect(result2).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/l_fetch:${urlParam}/fl_layer_apply,fl_no_overflow/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)

      const loaderOptions3 = { width: 640 };
      const result3 = cloudinaryLoader({ loaderOptions: loaderOptions3, imageProps, cldOptions, cldConfig });
      expect(result3).toContain(`https://res.cloudinary.com/test-cloud/image/fetch/c_fill,w_${imageProps.width},h_${imageProps.height},g_auto/l_fetch:${urlParam}/fl_layer_apply,fl_no_overflow/c_scale,w_${loaderOptions3.width}/f_auto/q_auto/https://upload.wikimedia.org/wikipedia/commons/4/44/Jelly_cc11.jpg`)
    });

    it('should add any resizing after raw transformations', async () => {

      const imageProps = {
        height: '600',
        sizes: '100vw',
        src: 'images/turtle',
        width: '960',
      }

      const loaderOptions = {
        quality: 75,
        src: 'images/turtle',
        width: 960,
      }

      const cldOptions = {
        rawTransformations: ['c_crop,h_359,w_517,x_1483,y_0/c_scale,h_359,w_517/f_auto,q_auto']
      };

      const result = cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig });

      expect(result).toContain(`image/upload/${cldOptions.rawTransformations.join('/')}/c_limit,w_${imageProps.width}/f_auto/q_auto/v1/${imageProps.src}`)
    });

    describe('Config', () => {
      it('should add a custom cname via secureDistribution', async () => {
        const imageProps = {
          height: '600',
          sizes: '100vw',
          src: 'images/turtle',
          width: '960',
        }

        const loaderOptions = {
          quality: 75,
          src: 'images/turtle',
          width: 960,
        }

        const config = {
          url: {
            secureDistribution: 'spacejelly.dev'
          }
        }

        const result = cloudinaryLoader({
          loaderOptions,
          imageProps,
          cldConfig: Object.assign({}, cldConfig, config)
        });

        expect(result).toContain(`https://${config.url.secureDistribution}/${cldConfig.cloud.cloudName}/image/upload`)
      });

    });
  })
});



