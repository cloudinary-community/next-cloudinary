import { effects as qualifiersEffects } from '../constants/qualifiers';
import { constructTransformation } from '../lib/transformations';

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

  function constructTransformationString({ effects, options }) {
    return Object.keys(effects).map(key => {
      const { prefix, qualifier } = effects[key];
      return constructTransformation({
        qualifier,
        prefix,
        value: options[key]
      });
    })
  }
}