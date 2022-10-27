import { constructCloudinaryUrl } from '../lib/cloudinary';

export function cloudinaryLoader(defaultOptions, cldOptions, cldConfig = {}) {
  return constructCloudinaryUrl({
    options: {
      ...defaultOptions,
      ...cldOptions
    },
    config: cldConfig
  });
}