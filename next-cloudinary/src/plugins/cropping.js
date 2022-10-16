const cropsGravityAuto = [ 'crop', 'fill', 'lfill', 'fill_pad', 'thumb' ];

export const props = ['crop', 'gravity'];

export function plugin({ cldImage, options, cldOptions } = {}) {
    const { width, height } = options;
    const { crop = 'limit', gravity } = cldOptions;
    
    let transformationString = `c_${crop},w_${width}`;
    
    if ( !gravity && cropsGravityAuto.includes(crop) ) {
        cldOptions.gravity = 'auto';
    }
    
    if ( !['limit'].includes(crop) ) {
        transformationString = `${transformationString},h_${height}`;
    }
    
    if ( cldOptions.gravity ) {
        if ( cldOptions.gravity === 'auto' && !cropsGravityAuto.includes(crop) ) {
        console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
        } else {
        transformationString = `${transformationString},g_${cldOptions.gravity}`;
        }
    }

    cldImage.resize(transformationString);
}
