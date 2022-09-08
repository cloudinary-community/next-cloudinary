import Image from 'next/image';
import { Cloudinary } from '@cloudinary/url-gen';
import { jsx } from 'react/jsx-runtime';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const cld$1 = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    // Used to avoid issues with SSR particularly for the blurred placeholder
    analytics: false
  }
});
/**
 * createPlaceholderUrl
 */

function createPlaceholderUrl({
  src,
  placeholder
}) {
  const cldImage = cld$1.image(src).resize('c_limit,w_100').delivery('q_1').format('auto');

  if (placeholder === 'grayscale') {
    cldImage.effect('e_grayscale');
  }

  if (placeholder.includes('color:')) {
    const color = placeholder.split(':').splice(1).join(':');
    cldImage.effect('e_grayscale');
    cldImage.effect(`e_colorize:60,co_${color}`);
  }

  return cldImage.toURL();
}

const cropsGravityAuto = ['crop', 'fill', 'lfill', 'fill_pad', 'thumb'];
function croppingPlugin({
  cldImage,
  options,
  cldOptions
} = {}) {
  const {
    width,
    height
  } = options;
  const {
    crop = 'limit',
    gravity
  } = cldOptions;
  let transformationString = `c_${crop},w_${width}`;

  if (!gravity && cropsGravityAuto.includes(crop)) {
    gravity = 'auto';
  }

  if (!['limit'].includes(crop)) {
    transformationString = `${transformationString},h_${height}`;
  }

  if (gravity) {
    if (gravity === 'auto' && !cropsGravityAuto.includes(crop)) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = `${transformationString},g_${gravity}`;
    }
  }

  cldImage.resize(transformationString);
}

// aspectRatio
const primary = {
  aspectRatio: {
    qualifier: 'ar'
  },
  crop: {
    qualifier: 'c'
  },
  gravity: {
    qualifier: 'g'
  },
  height: {
    qualifier: 'h'
  },
  width: {
    qualifier: 'w'
  }
};
const position = {
  angle: {
    qualifier: 'a'
  },
  gravity: {
    qualifier: 'g'
  },
  x: {
    qualifier: 'x'
  },
  y: {
    qualifier: 'y'
  }
};
const text = {
  color: {
    qualifier: 'co',
    location: 'primary'
  },
  textDecoration: {
    qualifier: false
  },
  fontFamily: {
    qualifier: false
  },
  fontSize: {
    qualifier: false
  },
  fontWeight: {
    qualifier: false
  },
  letterSpacing: {
    qualifier: 'letter_spacing'
  }
};

const _excluded$2 = ["publicId", "position", "text", "effects"];
function overlaysPlugin({
  cldImage,
  options,
  cldOptions
} = {}) {
  const {
    overlays = []
  } = cldOptions;
  const type = 'overlay';
  const typeQualifier = 'l';
  overlays.forEach(_ref => {
    let {
      publicId,
      position: position$1,
      text: text$1,
      effects: layerEffects = []
    } = _ref,
        options = _objectWithoutPropertiesLoose(_ref, _excluded$2);

    const hasPublicId = typeof publicId === 'string';
    const hasText = typeof text$1 === 'object';
    const hasPosition = typeof position$1 === 'object';

    if (!hasPublicId && !hasText) {
      console.warn(`An ${type} is missing Public ID or Text`);
      return;
    } // Start to construct the transformation string using text or the public ID
    // if it's image-based


    let layerTransformation;

    if (hasText) {
      layerTransformation = `${typeQualifier}_text`;
    } else {
      layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ':')}`;
    } // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL


    const primary$1 = [];
    const applied = []; // Gemeral options

    Object.keys(options).forEach(key => {
      if (!primary[key]) return;
      const {
        qualifier
      } = primary[key];
      primary$1.push(`${qualifier}_${options[key]}`);
    }); // Layer effects

    layerEffects.forEach(effect => {
      Object.keys(effect).forEach(key => {
        if (!primary[key]) return;
        const {
          qualifier
        } = primary[key];
        primary$1.push(`${qualifier}_${effect[key]}`);
      });
    }); // Text styling

    if (hasText) {
      const textTransformations = [];
      Object.keys(text$1).forEach(key => {
        if (!text[key]) return;
        const {
          qualifier,
          location
        } = text[key];

        if (location === 'primary') {
          primary$1.push(`${qualifier}_${text$1[key]}`);
        } else {
          textTransformations.push(text$1[key]);
        }
      });
      layerTransformation = `${layerTransformation}:${textTransformations.join('_')}:${text$1.text}`;
    } // Positioning


    if (hasPosition) {
      Object.keys(position$1).forEach(key => {
        if (!position[key]) return;
        const {
          qualifier
        } = position[key];
        applied.push(`${qualifier}_${position$1[key]}`);
      });
    } // Add all primary transformations


    layerTransformation = `${layerTransformation},${primary$1.join(',')}`; // Add all applied transformations

    layerTransformation = `${layerTransformation}/fl_layer_apply`;

    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(',')}`;
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  });
}

function removeBackgroundPlugin({
  cldImage,
  options,
  cldOptions
} = {}) {
  const {
    removeBackground = false
  } = cldOptions;

  if (removeBackground) {
    cldImage.effect('e_background_removal');
  }
}

function tintPlugin({
  cldImage,
  options,
  cldOptions
} = {}) {
  const {
    tint
  } = cldOptions;

  if (tint) {
    cldImage.effect(`e_tint:${tint}`);
  }
}

const _excluded$1 = ["publicId", "type", "position", "text", "effects"];
function underlaysPlugin({
  cldImage,
  options,
  cldOptions
} = {}) {
  const {
    underlays = []
  } = cldOptions;
  const typeQualifier = 'u';
  underlays.forEach(_ref => {
    let {
      publicId,
      type,
      position: position$1,
      effects: layerEffects = []
    } = _ref,
        options = _objectWithoutPropertiesLoose(_ref, _excluded$1);

    const hasPublicId = typeof publicId === 'string';
    const hasPosition = typeof position$1 === 'object';

    if (!hasPublicId) {
      console.warn(`An ${type} is missing a Public ID`);
      return;
    } // Start to construct the transformation string using text or the public ID
    // if it's image-based


    let layerTransformation = `${typeQualifier}_${publicId.replace(/\//g, ':')}`; // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL

    const primary$1 = [];
    const applied = []; // Gemeral options

    Object.keys(options).forEach(key => {
      if (!primary[key]) return;
      const {
        qualifier
      } = primary[key];
      primary$1.push(`${qualifier}_${options[key]}`);
    }); // Layer effects

    layerEffects.forEach(effect => {
      Object.keys(effect).forEach(key => {
        if (!primary[key]) return;
        const {
          qualifier
        } = primary[key];
        primary$1.push(`${qualifier}_${effect[key]}`);
      });
    }); // Positioning

    if (hasPosition) {
      Object.keys(position$1).forEach(key => {
        if (!position[key]) return;
        const {
          qualifier
        } = position[key];
        applied.push(`${qualifier}_${position$1[key]}`);
      });
    } // Add all primary transformations


    layerTransformation = `${layerTransformation},${primary$1.join(',')}`; // Add all applied transformations

    layerTransformation = `${layerTransformation}/fl_layer_apply`;

    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(',')}`;
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  });
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});
const transformationPlugins = [// Background Removal must always come first
removeBackgroundPlugin, croppingPlugin, tintPlugin, overlaysPlugin, underlaysPlugin];
function cloudinaryLoader(options, cldOptions) {
  const {
    src,
    width,
    format = 'auto',
    quality = 'auto'
  } = options;
  const cldImage = cld.image(src);
  transformationPlugins.forEach(plugin => {
    plugin({
      cldImage,
      options,
      cldOptions
    });
  });
  return cldImage.format(format).delivery(`q_${quality}`).toURL();
}

const _excluded = ["crop", "gravity", "overlays", "removeBackground", "tint", "underlays"];

const CldImage = _ref => {
  let {
    crop,
    gravity,
    overlays,
    removeBackground,
    tint,
    underlays
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const cldOptions = {
    crop,
    gravity,
    overlays,
    removeBackground,
    tint,
    underlays
  };
  const imageProps = {}; // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if (props.placeholder) {
    imageProps.blurDataURL = createPlaceholderUrl({
      src: props.src,
      placeholder: props.placeholder
    });

    if (props.placeholder !== 'blur') {
      props.placeholder = 'blur';
    }
  }

  return /*#__PURE__*/jsx(Image, _extends({}, imageProps, props, {
    loader: options => cloudinaryLoader(_extends({}, props, {
      options
    }), cldOptions)
  }));
};

export { CldImage, cloudinaryLoader, position, primary, text };
//# sourceMappingURL=next-cloudinary.modern.mjs.map
