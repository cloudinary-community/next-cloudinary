export const props = ['rawTransformations'];

export function plugin({ cldImage, options } = {}) {
  const { rawTransformations = [] } = options;

  rawTransformations.forEach(transformation => {
    cldImage.addTransformation(transformation);
  });
}