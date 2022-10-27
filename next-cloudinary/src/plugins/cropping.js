const cropsGravityAuto = [ 'crop', 'fill', 'lfill', 'fill_pad', 'thumb' ];

export const props = ['crop', 'gravity'];

export function plugin({ cldImage, options } = {}) {
  const { width, height, crop = 'limit' } = options;

  let transformationString = `c_${crop},w_${width}`;

  if ( !options.gravity && cropsGravityAuto.includes(crop) ) {
    options.gravity = 'auto';
  }

  if ( !['limit'].includes(crop) ) {
    transformationString = `${transformationString},h_${height}`;
  }

  if ( options.gravity ) {
    if ( options.gravity === 'auto' && !cropsGravityAuto.includes(crop) ) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = `${transformationString},g_${options.gravity}`;
    }
  }

  cldImage.resize(transformationString);
}
