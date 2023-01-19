import {
  flags as qualifiersFlags,
  primary as qualifiersPrimary,
  position as qualifiersPosition
} from '../constants/qualifiers';

export const props = ['underlay', 'underlays'];

export function plugin({ cldImage, options } = {}) {
  const { underlay, underlays = [] } = options;

  const type = 'underlay';
  const typeQualifier = 'u';

  if ( Array.isArray(underlays) ) {
    underlays.forEach(applyUnderlay);
  }

  if ( typeof underlay === 'string' ) {

    const underlayOptions = {
      publicId: underlay,
      crop: 'fill',
      width: '1.0',
      height: '1.0',
      flags: ['relative']
    }

    applyUnderlay(underlayOptions);
  }

  /**
   * applyUnderlay
   */

  function applyUnderlay({ publicId, type, position, text, effects: layerEffects = [], flags = [], ...options }) {
    const hasPublicId = typeof publicId === 'string';
    const hasPosition = typeof position === 'object';

    if ( !hasPublicId ) {
      console.warn(`An ${type} is missing a Public ID`);
      return;
    }

    // Start to construct the transformation string using text or the public ID
    // if it's image-based

    let layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ':')}`;

    // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL

    const primary = [];
    const applied = [];

    // Gemeral options

    Object.keys(options).forEach(key => {
      if ( !qualifiersPrimary[key] ) return;
      const { qualifier } = qualifiersPrimary[key];
      primary.push(`${qualifier}_${options[key]}`);
    });

    // Layer effects

    layerEffects.forEach(effect => {
      Object.keys(effect).forEach(key => {
        if ( !qualifiersPrimary[key] ) return;
        const { qualifier } = qualifiersPrimary[key];
        primary.push(`${qualifier}_${effect[key]}`);
      });
    });

    // Positioning

    if ( hasPosition ) {
      Object.keys(position).forEach(key => {
        if ( !qualifiersPosition[key] ) return;

        const { qualifier } = qualifiersPosition[key];

        applied.push(`${qualifier}_${position[key]}`);
      });
    }

    // Positioning

    flags.forEach(key => {
      if ( !qualifiersFlags[key] ) return;

      const { qualifier, prefix } = qualifiersFlags[key];

      primary.push(`${prefix}_${qualifier}`);
    });

    // Add all primary transformations

    layerTransformation = `${layerTransformation},${primary.join(',')}`;

    // Add all applied transformations

    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;

    if ( applied.length > 0 ) {
      layerTransformation = `${layerTransformation},${applied.join(',')}`;
    }

    // Finally add it to the image

    cldImage.addTransformation(layerTransformation);
  }
}