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
  let modifiedOptions = { ...options };
  
  const isAutoPad = String(modifiedOptions.crop) === 'auto_pad';
  
  if (isAutoPad) {
    const existingRawTransformations = modifiedOptions.rawTransformations || [];
    const rawTransformations = Array.isArray(existingRawTransformations) 
      ? [...existingRawTransformations] 
      : [existingRawTransformations];
    
    if (String(modifiedOptions.gravity) === 'auto') {
      const { gravity, ...optionsWithoutGravity } = modifiedOptions;
      modifiedOptions = optionsWithoutGravity;
      rawTransformations.push('g_auto');
    }
    
    if (modifiedOptions.aspectRatio) {
      const { aspectRatio, ...optionsWithoutAspectRatio } = modifiedOptions;
      modifiedOptions = optionsWithoutAspectRatio;
      rawTransformations.push(`ar_${aspectRatio}`);
    }
    
    if (rawTransformations.length > 0) {
      modifiedOptions.rawTransformations = rawTransformations;
    }
  }
  
  return constructCloudinaryUrl({
    options: modifiedOptions,
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}
