import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { config as cloudinaryConfig } from '../lib/config';

import { NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';

/**
 * getCldImage
 */

export interface GetCldImageUrlOptions extends ImageOptions {};
export interface GetCldImageUrlConfig extends ConfigOptions {};
export interface GetCldImageUrlAnalytics extends AnalyticsOptions {};

export interface GetCldImageUrl {
  options: GetCldImageUrlOptions;
  config?: GetCldImageUrlConfig;
  analytics?: GetCldImageUrlAnalytics;
}

export function getCldImageUrl(options: ImageOptions, config?: ConfigOptions, analytics?: AnalyticsOptions) {
  return constructCloudinaryUrl({
    options,
    config: Object.assign({}, cloudinaryConfig, config),
    analytics: Object.assign({
      sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
      sdkSemver: NEXT_CLOUDINARY_VERSION,
      techVersion: NEXT_VERSION,
      feature: ''
    }, analytics)
  });
}