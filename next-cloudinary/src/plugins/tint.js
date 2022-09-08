export function tintPlugin({ cldImage, options, cldOptions } = {}) {
  const { tint } = cldOptions;

  if ( tint ) {
    cldImage.effect(`e_tint:${tint}`);
  }
}