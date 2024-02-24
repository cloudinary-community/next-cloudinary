import { versions } from '../../versions';
// @ts-ignore
import nextPkg from 'next/package';

export const NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID = 'A';
export const NEXT_CLOUDINARY_ANALYTICS_ID = 'V';
export const NEXT_VERSION = normalizeVersion(nextPkg.version);
export const NEXT_CLOUDINARY_VERSION = normalizeVersion(versions.NEXT_CLOUDINARY_VERSION);

function normalizeVersion(version: string) {
  let normalized = version;
  if ( normalized.includes('-') ) {
    normalized = normalized.split('-')[0];
  }
  return normalized;
}