import { effects } from '../constants/qualifiers';

export const props = Object.keys(effects);

export function plugin({ cldImage, options } = {}) {
  Object.keys(effects).forEach(key => {
    const { prefix, qualifier } = effects[key];
    let transformation = '';

    if ( prefix ) {
      transformation = `${prefix}_`;
    }

    if ( options[key] === true ) {
      cldImage.effect(`${transformation}${qualifier}`);
    } else if ( typeof options[key] === 'string' ) {
      if ( prefix ) {
        cldImage.effect(`${transformation}${qualifier}:${options[key]}`);
      } else {
        cldImage.effect(`${qualifier}_${options[key]}`);
      }
    }
  });
}