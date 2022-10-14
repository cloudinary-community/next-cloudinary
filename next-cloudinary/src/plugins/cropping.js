const cropsGravityAuto = [ 'crop', 'fill', 'lfill', 'fill_pad', 'thumb' ];

export const props = ['crop', 'gravity'];

export function plugin({ cldImage, options } = {}) {
  const { width, height, crop = 'limit', gravity } = options;

  let transformationString = `c_${crop},w_${width}`;

  if ( !gravity && cropsGravityAuto.includes(crop) ) {
    gravity = 'auto';
  }

  if ( !['limit'].includes(crop) ) {
    transformationString = `${transformationString},h_${height}`;
  }

  if ( gravity ) {
    if ( gravity === 'auto' && !cropsGravityAuto.includes(crop) ) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = `${transformationString},g_${gravity}`;
    }
  }

  cldImage.resize(transformationString);
}