export const props = ['removeBackground'];

export function plugin({ cldImage, options } = {}) {
  const { removeBackground = false } = options;
  if ( removeBackground ) {
    cldImage.effect('e_background_removal');
  }
}