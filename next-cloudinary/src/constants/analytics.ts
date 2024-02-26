import nextPkg from 'next/package.json';
import pkg from '../../package.json';

export const NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID = 'A';
export const NEXT_CLOUDINARY_ANALYTICS_ID = 'V';
export const NEXT_VERSION = normalizeVersion(nextPkg.version);
export const NEXT_CLOUDINARY_VERSION = normalizeVersion(pkg.version);

function normalizeVersion(version: string) {
  let normalized = version;
  if ( normalized.includes('-') ) {
    normalized = normalized.split('-')[0];
  }
  return normalized;
}