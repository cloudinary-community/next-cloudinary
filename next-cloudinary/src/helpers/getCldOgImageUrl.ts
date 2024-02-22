import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '../constants/sizes';

import { getCldImageUrl } from './getCldImageUrl';
import type { GetCldImageUrlOptions } from './getCldImageUrl';

/**
 * getCldImageUrl
 */

export type GetCldOgImageUrlOptions = GetCldImageUrlOptions;

export function getCldOgImageUrl(options: GetCldOgImageUrlOptions) {
  return getCldImageUrl({
    ...options,
    format: options.format || 'jpg',
    width: options.width || OG_IMAGE_WIDTH,
    height: options.height || OG_IMAGE_HEIGHT,
    crop: options.crop || {
      type: 'fill',
      gravity: 'center',
      source: true
    }
  });
}