const cropsGravityAuto = [ 'crop', 'fill', 'lfill', 'fill_pad', 'thumb' ];

export const props = ['crop', 'gravity'];

export function plugin({ cldImage, options, cldOptions } = {}) {
  const { width, height } = options;
  const { crop = 'limit', gravity } = cldOptions;

  let transformationString = `c_${crop},w_${width}`;

  if ( !['limit'].includes(crop) ) {
    transformationString = `${transformationString},h_${height}`;
  }
  
  if ( !gravity ) {
    if ( cropsGravityAuto.includes(crop) && !gravity ) {
    gravity = 'auto';
    } else {
      transformationString = `${transformationString},h_${height}`;
    }
  }
  
  if ( gravity ) {
    if ( !cropsGravityAuto.includes(crop) && gravity === 'auto' ) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = `${transformationString},g_${gravity}`;
    }
  }

  cldImage.resize(transformationString);
}
