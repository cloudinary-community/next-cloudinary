export const props = ['transformations'];

export function plugin({ cldImage, options } = {}) {
  let { transformations = [] } = options;

  if ( !Array.isArray(transformations) ) {
    transformations = [transformations];
  }

  transformations.forEach(transformation => {
    cldImage.addTransformation(`t_${transformation}`);
  });
}