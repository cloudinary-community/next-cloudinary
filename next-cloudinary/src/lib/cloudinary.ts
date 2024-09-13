import { AnalyticsOptions, ConfigOptions } from "@cloudinary-util/url-loader";

import { NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID, NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';

/**
 * pollForProcessingImage
 */

export interface PollForProcessingImageOptions {
  src: string;
}

export async function pollForProcessingImage(options: PollForProcessingImageOptions): Promise<boolean> {
  const { src } = options;
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then(res => {
        if ( !res.ok ) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  } catch(e: any) {
    // Timeout for 200ms before trying to fetch again to avoid overwhelming requests

    if ( e.status === 423 ) {
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 200));
      return await pollForProcessingImage(options);
    }
    return false;
  }
  return true;
}

/**
 * getCloudinaryConfig
 */

export function getCloudinaryConfig(config?: ConfigOptions): ConfigOptions {
  const cloudName = config?.cloud?.cloudName ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error('A Cloudinary Cloud name is required, please make sure NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.');
  }

  const apiKey = config?.cloud?.apiKey ?? process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const secureDistribution = config?.url?.secureDistribution ?? process.env.NEXT_PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION;
  const privateCdn = config?.url?.privateCdn ?? process.env.NEXT_PUBLIC_CLOUDINARY_PRIVATE_CDN;

  return Object.assign({
    cloud: {
      ...config?.cloud,
      apiKey,
      cloudName
    },
    url: {
      ...config?.url,
      secureDistribution,
      privateCdn
    }
  }, config);
}

/**
 * getCloudinaryAnalytics
 */

export function getCloudinaryAnalytics(analytics?: AnalyticsOptions) {
  return Object.assign({
    product: NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID,
    sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
    sdkSemver: NEXT_CLOUDINARY_VERSION,
    techVersion: NEXT_VERSION,
    feature: ''
  }, analytics)
}