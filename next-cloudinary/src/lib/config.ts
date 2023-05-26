import type { ConfigOptions } from '@cloudinary-util/url-loader';

const defaultConfig: ConfigOptions = {
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
};

const userConfig = process.env.cloudinary || {};

export const config = Object.assign({}, defaultConfig, userConfig);

console.log('config', config)