import { encodeBase64 } from '../lib/util';
import { constructTransformation } from '../lib/transformations';

import {
  effects as qualifiersEffects,
  position as qualifiersPosition,
  primary as qualifiersPrimary,
  text as qualifiersText,
} from '../constants/qualifiers';

export const props = ['text', 'overlays'];

export const DEFAULT_TEXT_OPTIONS = {
  color: 'black',
  fontFamily: 'Arial',
  fontSize: 200,
  fontWeight: 'bold',
};

export function plugin({ cldImage, options } = {}) {
  const { text, overlays = [] } = options;

  const type = 'overlay';
  const typeQualifier = 'l';

  if ( Array.isArray(overlays) ) {
    overlays.forEach(applyOverlay);
  }

  if ( typeof text === 'string' ) {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        text
      }
    })
  } else if ( typeof text === 'object' ) {
    applyOverlay({
      text: {
        ...DEFAULT_TEXT_OPTIONS,
        ...text
      }
    })
  }

  /**
   * applyOverlay
   */

  function applyOverlay({ publicId, url, position, text, effects: layerEffects = [], appliedEffects = [], ...options }) {
    const hasPublicId = typeof publicId === 'string';
    const hasUrl = typeof url === 'string';
    const hasText = typeof text === 'object' || typeof text === 'string';
    const hasPosition = typeof position === 'object';

    if ( !hasPublicId && !hasUrl && !hasText ) {
      console.warn(`An ${type} is missing Public ID, URL, or Text`);
      return;
    }

    // Start to construct the transformation string using text or the public ID
    // if it's image-based

    let layerTransformation;

    if ( hasText ) {
      layerTransformation = `${typeQualifier}_text`;
    } else if ( hasPublicId ) {
      layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ':')}`;
    } else if ( hasUrl ) {
      layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
    }

    // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL

    const primary = [];
    const applied = [];

    // Gemeral options

    Object.keys(options).forEach(key => {
      if ( !qualifiersPrimary[key] ) return;

      const { qualifier } = qualifiersPrimary[key];

      const transformation = constructTransformation({
        qualifier,
        value: options[key]
      });

      primary.push(transformation);
    });

    // Layer effects
    // For layer effects we allow both the standard effects to be applied as well
    // as the primary ones like width and height as those can be used to modify
    // the layer after it's created

    layerEffects.forEach(effect => {
      Object.keys(effect).forEach(key => {
        const { qualifier, prefix } = qualifiersPrimary[key] || qualifiersEffects[key] || {};

        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key]
        });

        primary.push(transformation);
      });
    });

    // Applied Layer effects
    // Similar to layer effects but they get appended to an additional transformation
    // along with fl_layer_applied

    appliedEffects.forEach(effect => {
      Object.keys(effect).forEach(key => {
        const { qualifier, prefix } = qualifiersPrimary[key] || qualifiersEffects[key] || {};

        const transformation = constructTransformation({
          qualifier,
          prefix,
          value: effect[key]
        });

        applied.push(transformation);
      });
    });



    // Text styling

    if ( hasText ) {
      if ( typeof text === 'string' ) {
        text = {
          ...DEFAULT_TEXT_OPTIONS,
          text
        }
      }


      const textTransformations = [];

      Object.keys(text).forEach(key => {
        if ( !qualifiersText[key] ) return;

        const { qualifier, location } = qualifiersText[key];

        if ( location === 'primary' ) {
          primary.push(`${qualifier}_${text[key]}`);
        } else if ( qualifier === 'self' ) {
          textTransformations.push(key);
        } else if ( qualifier ) {
          textTransformations.push(`${qualifier}_${text[key]}`);
        } else {
          textTransformations.push(text[key]);
        }
      });

      layerTransformation = `${layerTransformation}:${textTransformations.join('_')}:${text.text}`
    }

    // Positioning

    if ( hasPosition ) {
      Object.keys(position).forEach(key => {
        if ( !qualifiersPosition[key] ) return;

        const { qualifier } = qualifiersPosition[key];

        const transformation = constructTransformation({
          qualifier,
          value: position[key]
        });

        applied.push(transformation);
      });
    }

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