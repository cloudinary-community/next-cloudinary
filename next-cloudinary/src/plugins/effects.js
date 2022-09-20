const params = [
  'art',
  {
    prop: 'autoBrightness',
    effect: 'auto_brightness',
  },
  {
    prop: 'autoColor',
    effect: 'auto_color',
  },
  {
    prop: 'autoContrast',
    effect: 'auto_contrast',
  },
  {
    prop: 'assistColorblind',
    effect: 'assist_colorblind',
  },
  'blackwhite',
  'blur',
  {
    prop: 'blurFaces',
    effect: 'blur_faces',
  },
  {
    prop: 'blurRegion',
    effect: 'blur_region',
  },
  'brightness',
  {
    prop: 'brightnessHSB',
    effect: 'brightness_hsb',
  },
  'cartoonify',
  'colorize',
  'contrast',
  'distort',
  {
    prop: 'fillLight',
    effect: 'fill_light',
  },
  'gamma',
  {
    prop: 'gradientFade',
    effect: 'gradient_fade',
  },
  'grayscale',
  'improve',
  'negate',
  {
    prop: 'oilPaint',
    effect: 'oil_paint',
  },
  'outline',
  'pixelate',
  {
    prop: 'pixelateFaces',
    effect: 'pixelate_faces',
  },
  {
    prop: 'pixelateRegion',
    effect: 'pixelate_region',
  },
  'redeye',
  {
    prop: 'replaceColor',
    effect: 'replace_color',
  },
  'saturation',
  'sepia',
  'shadow',
  'sharpen',
  'shear',
  {
    prop: 'simulateColorblind',
    effect: 'simulate_colorblind',
  },
  'tint',
  {
    prop: 'unsharpMask',
    effect: 'unsharp_mask',
  },
  'vectorize',
  'vibrance',
  'vignette',
  // 'zoompan' // requires GIF format
];

export const options = params.map(param => param.prop || param);

export function plugin({ cldImage, cldOptions } = {}) {
  params.forEach(key => {

    const prop = key.prop || key;
    const effect = key.effect || key;

    if ( prop === 'oilPaint' && cldOptions[prop]) {
      console.log('cldOptions[prop]', cldOptions[prop])
    }
    if ( cldOptions[prop] === true ) {
      cldImage.effect(`e_${effect}`);
    } else if ( typeof cldOptions[prop] === 'string' ) {
      cldImage.effect(`e_${effect}:${cldOptions[prop]}`);
    }
  });
}