import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID, NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';
import {checkForCloudName} from "../lib/cloudinary";

/**
 * getCldImageUrl
 */

export type GetCldImageUrlOptions = ImageOptions;
export type GetCldImageUrlConfig = ConfigOptions;
export type GetCldImageUrlAnalytics = AnalyticsOptions;

export function getCldImageUrl(options: GetCldImageUrlOptions, config?: GetCldImageUrlConfig, analytics?: GetCldImageUrlAnalytics) {
  // @ts-expect-error Property 'cloud' does not exist on type 'CloudinaryConfigurationOptions'.
  const cloudName = config?.cloud?.cloudName ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  checkForCloudName(cloudName);
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName: cloudName
      },
    }, config),
    analytics: Object.assign({
      product: NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID,
      sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: NEXT_CLOUDINARY_VERSION,
      techVersion: NEXT_VERSION,
      feature: ''
    }, analytics)
  });
}
