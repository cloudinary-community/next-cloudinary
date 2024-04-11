import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { getCloudinaryConfig, getCloudinaryAnalytics } from "../lib/cloudinary";

/**
 * getCldImageUrl
 */

export type GetCldImageUrlOptions = ImageOptions;
export type GetCldImageUrlConfig = ConfigOptions;
export type GetCldImageUrlAnalytics = AnalyticsOptions;

export function getCldImageUrl(options: GetCldImageUrlOptions, config?: GetCldImageUrlConfig, analytics?: GetCldImageUrlAnalytics) {
  return constructCloudinaryUrl({
    options,
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}
