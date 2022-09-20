export const props = ['removeBackground'];

export function plugin({ cldImage, options, cldOptions } = {}) {
  const { removeBackground = false } = cldOptions;
  if ( removeBackground ) {
    cldImage.effect('e_background_removal');
  }
}