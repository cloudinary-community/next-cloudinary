export const props = ['zoompan'];

export const options = {
  format: 'gif'
}

export function plugin({ cldImage, cldOptions } = {}) {
  const { zoompan = false } = cldOptions;

  if ( zoompan === true ) {
    cldImage.effect('e_zoompan');
  } else if ( typeof zoompan === 'string' ) {
    if ( zoompan === 'loop' ) {
      cldImage.effect('e_zoompan');
      cldImage.effect('e_loop');
    } else {
      cldImage.effect(`e_zoompan:${zoompan}`);
    }
  } else if ( typeof zoompan === 'object' ) {
    let zoompanEffect = 'e_zoompan';

    if ( typeof zoompan.options === 'string' ) {
      zoompanEffect = `${zoompanEffect}${zoompan.options}`;
    }

    cldImage.effect(zoompanEffect);

    let loopEffect;

    if ( zoompan.loop === true ) {
      loopEffect = 'e_loop';
    } else if ( typeof zoompan.loop === 'string' ) {
      loopEffect = `e_loop${zoompan.loop}`;
    }

    if ( loopEffect ) {
      cldImage.effect(loopEffect);
    }
  }
}