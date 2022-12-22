import { effects as qualifiersEffects } from '../constants/qualifiers';

export const props = [...Object.keys(qualifiersEffects), 'effects'];

export function plugin({ cldImage, options } = {}) {

  // Handle any top-level effect props

  const transformationStrings = constructTransformationString({
    effects: qualifiersEffects,
    options
  }).filter(t => !!t).forEach(transformation => cldImage.effect(transformation));;

  // If we're passing in an effects prop explicitly, treat it as an array of
  // effects that we need to process

  if ( Array.isArray(options.effects) ) {
    options.effects.forEach(effectsSet => {
      const transformationString = constructTransformationString({
        effects: qualifiersEffects,
        options: effectsSet
      }).filter(t => !!t).join(',');
      cldImage.effect(transformationString);
    });
  }

  /**
   * constructEffect
   */

  function constructEffect({ effect, value }) {
    const { prefix, qualifier } = effect;
      let transformation = '';

      if ( prefix ) {
        transformation = `${prefix}_`;
      }

      if ( value === true ) {
        return `${transformation}${qualifier}`;
      } else if ( typeof value === 'string' || typeof value === 'number' ) {
        if ( prefix ) {
          return `${transformation}${qualifier}:${value}`;
        } else {
          return `${qualifier}_${value}`;
        }
      }
  }

  function constructTransformationString({ effects, options }) {
    return Object.keys(effects).map(key => {
      return constructEffect({
        effect: effects[key],
        value: options[key]
      });
    })
  }
}