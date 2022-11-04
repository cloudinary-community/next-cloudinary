/**
 * encodeBase64
 */

export function encodeBase64(value) {
  if ( typeof btoa === 'function' ) {
    return btoa(value);
  }

  if ( typeof Buffer !== 'undefined' ) {
    return Buffer.from(value).toString('base64');
  }
}