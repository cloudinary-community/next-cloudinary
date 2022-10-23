const cropsGravityAuto = [ 'crop', 'fill', 'lfill', 'fill_pad', 'thumb' ];

export const props = ['crop', 'gravity'];

export function plugin({ cldImage, options, cldOptions } = {}) {
  const { width, height } = options;
  const { crop = 'limit', gravity } = cldOptions;

  if ( !options.height ) {
  let transformationString = `c_${crop},w_${width}`;
  } else {
    let transformationString = `c_${crop},w_${width},h_${height}`;
  }

  if ( !['limit'].includes(crop) ) {
    transformationString = `${transformationString}`;
  }
  
  if ( !gravity ) {
    if ( cropsGravityAuto.includes(crop) ) {
    cldOptions.gravity = 'auto';
    } else {
      transformationString = `${transformationString}`;
    }
  }
  
  if ( cldOptions.gravity ) {
    if ( !cropsGravityAuto.includes(crop) && cldOptions.gravity === 'auto' ) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = `${transformationString},g_${gravity}`;
    }
  }

  cldImage.resize(transformationString);
}
