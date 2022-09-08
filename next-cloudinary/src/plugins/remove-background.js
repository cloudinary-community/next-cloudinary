export function removeBackgroundPlugin({ cldImage, options, cldOptions } = {}) {
  const { removeBackground = false } = cldOptions;
  if ( removeBackground ) {
    cldImage.effect('e_background_removal');
  }
}