// @ts-expect-error Could not find a declaration file for module
import { versions } from '../../versions';

export const NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID = 'A';
export const NEXT_CLOUDINARY_ANALYTICS_ID = 'V';
export const NEXT_VERSION = normalizeVersion(versions.NEXT_VERSION);
export const NEXT_CLOUDINARY_VERSION = normalizeVersion(versions.NEXT_CLOUDINARY_VERSION);

function normalizeVersion(version: string) {
  let normalized = version;
  if ( normalized.includes('-') ) {
    normalized = normalized.split('-')[0];
  }
  return normalized;
}