import { OG_IMAGE_WIDTH, OG_IMAGE_WIDTH_RESIZE, OG_IMAGE_HEIGHT } from '../constants/sizes';

import { getCldImageUrl } from './getCldImageUrl';
import type { GetCldImageUrl, GetCldImageUrlOptions } from './getCldImageUrl';

/**
 * getCldImageUrl
 */

export interface GetCldOgImageUrl extends GetCldImageUrl {}

export function getCldOgImageUrl(options: GetCldImageUrlOptions) {
  return getCldImageUrl({
    ...options,
    crop: options.crop || 'fill',
    format: options.format || 'jpg',
    gravity: options.gravity || 'center',
    height: options.height || OG_IMAGE_HEIGHT,
    width: options.width || OG_IMAGE_WIDTH,
    widthResize: options.width || OG_IMAGE_WIDTH_RESIZE
  });
}