export const props = ['rawTransformations'];

export function plugin({ cldImage, cldOptions } = {}) {
  const { rawTransformations = [] } = cldOptions;

  rawTransformations.forEach(transformation => {
    cldImage.addTransformation(transformation);
  });
}