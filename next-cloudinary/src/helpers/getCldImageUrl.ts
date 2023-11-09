import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';

/**
 * getCldImageUrl
 */

export interface GetCldImageUrlOptions extends ImageOptions {};
export interface GetCldImageUrlConfig extends ConfigOptions {};
export interface GetCldImageUrlAnalytics extends AnalyticsOptions {};

// @deprecated GetCldImageUrl
export interface GetCldImageUrl {
  options: GetCldImageUrlOptions;
  config?: GetCldImageUrlConfig;
  analytics?: GetCldImageUrlAnalytics;
}

export function getCldImageUrl(options: GetCldImageUrlOptions, config?: GetCldImageUrlConfig, analytics?: GetCldImageUrlAnalytics) {
  const cloudName = config?.cloud?.cloudName ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName: cloudName
      },
    }, config),
    analytics: Object.assign({
      sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: NEXT_CLOUDINARY_VERSION,
      techVersion: NEXT_VERSION,
      feature: ''
    }, analytics)
  });
}
