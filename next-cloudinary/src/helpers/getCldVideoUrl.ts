import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { VideoOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { getCloudinaryConfig, getCloudinaryAnalytics } from "../lib/cloudinary";

/**
 * getCldVideoUrl
 */

export type GetCldVideoUrlOptions = VideoOptions;
export type GetCldVideoUrlConfig = ConfigOptions;
export type GetCldVideoUrlAnalytics = AnalyticsOptions;

export function getCldVideoUrl(options: GetCldVideoUrlOptions, config?: GetCldVideoUrlConfig, analytics?: GetCldVideoUrlAnalytics) {
  return constructCloudinaryUrl({
    options: {
      assetType: 'video',
      format: 'auto:video',
      ...options
    },
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}
