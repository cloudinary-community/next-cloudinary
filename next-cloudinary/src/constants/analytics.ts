import nextPkg from 'next/package.json';
import pkg from '../../package.json';

// Detect if this project was created via create-cloudinary-react CLI (Integrations)
// copied from https://github.com/cloudinary/frontend-frameworks/commit/00a8eb2b133c772fb6f54d840eba0012286b70b2#diff-9bc0325d4ce5c8af9b3be68a361f186552b51da8274a7a2f214f7deaa9b245af
function isCLI(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.CLOUDINARY_SOURCE === 'cli';
  }
  return false;
}

const isCLIDetected = isCLI();

export const NEXT_CLOUDINARY_ANALYTICS_PRODUCT_ID = (isCLIDetected ? 'I' : 'A');
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