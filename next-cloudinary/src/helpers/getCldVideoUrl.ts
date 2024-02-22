import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { VideoOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

import { NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID, NEXT_CLOUDINARY_ANALYTICS_ID, NEXT_CLOUDINARY_VERSION, NEXT_VERSION } from '../constants/analytics';
import {checkForCloudName} from "../lib/cloudinary";

/**
 * getCldVideoUrl
 */

export type GetCldVideoUrlOptions = VideoOptions;
export type GetCldVideoUrlConfig = ConfigOptions;
export type GetCldVideoUrlAnalytics = AnalyticsOptions;

export function getCldVideoUrl(options: GetCldVideoUrlOptions, config?: GetCldVideoUrlConfig, analytics?: GetCldVideoUrlAnalytics) {
  const cloudName = config?.cloud?.cloudName ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  checkForCloudName(cloudName);
  return constructCloudinaryUrl({
    options: {
      assetType: 'video',
      ...options
    },
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
