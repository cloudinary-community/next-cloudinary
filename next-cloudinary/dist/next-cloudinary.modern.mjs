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
 * Retrieves the public id of a cloudiary image url. If no url is recognized it returns the parameter it self.
 * If it's recognized that is a url and it's not possible to get the public id, it warns the user.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */

function getPublicId(src) {
  if (src.includes('res.cloudinary.com')) {
    const regexWithTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(.*)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/;
    const regexWithoutTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/;
    const withTransformations = src.match(regexWithTransformations);
    const withoutTransformations = src.match(regexWithoutTransformations);

    if (withTransformations) {
      return withTransformations[withTransformations.length - 1];
    } else if (withoutTransformations) {
      return withoutTransformations[withoutTransformations.length - 1];
    } else {
      console.warn(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudinary image url.`);
    }
  }

  return src;
}
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
const props$6 = ['crop', 'gravity'];
function plugin$6({
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

var croppingPlugin = {
  __proto__: null,
  props: props$6,
  plugin: plugin$6
};

const params = ['art', {
  prop: 'autoBrightness',
  effect: 'auto_brightness'
}, {
  prop: 'autoColor',
  effect: 'auto_color'
}, {
  prop: 'autoContrast',
  effect: 'auto_contrast'
}, {
  prop: 'assistColorblind',
  effect: 'assist_colorblind'
}, 'blackwhite', 'blur', {
  prop: 'blurFaces',
  effect: 'blur_faces'
}, {
  prop: 'blurRegion',
  effect: 'blur_region'
}, 'brightness', {
  prop: 'brightnessHSB',
  effect: 'brightness_hsb'
}, 'cartoonify', 'colorize', 'contrast', 'distort', {
  prop: 'fillLight',
  effect: 'fill_light'
}, 'gamma', {
  prop: 'gradientFade',
  effect: 'gradient_fade'
}, 'grayscale', 'improve', 'negate', {
  prop: 'oilPaint',
  effect: 'oil_paint'
}, 'outline', 'pixelate', {
  prop: 'pixelateFaces',
  effect: 'pixelate_faces'
}, {
  prop: 'pixelateRegion',
  effect: 'pixelate_region'
}, 'redeye', {
  prop: 'replaceColor',
  effect: 'replace_color'
}, 'saturation', 'sepia', 'shadow', 'sharpen', 'shear', {
  prop: 'simulateColorblind',
  effect: 'simulate_colorblind'
}, 'tint', {
  prop: 'unsharpMask',
  effect: 'unsharp_mask'
}, 'vectorize', 'vibrance', 'vignette'];
const props$5 = params.map(param => param.prop || param);
function plugin$5({
  cldImage,
  cldOptions
} = {}) {
  params.forEach(key => {
    const prop = key.prop || key;
    const effect = key.effect || key;

    if (prop === 'oilPaint' && cldOptions[prop]) {
      console.log('cldOptions[prop]', cldOptions[prop]);
    }

    if (cldOptions[prop] === true) {
      cldImage.effect(`e_${effect}`);
    } else if (typeof cldOptions[prop] === 'string') {
      cldImage.effect(`e_${effect}:${cldOptions[prop]}`);
    }
  });
}

var effectsPlugin = {
  __proto__: null,
  props: props$5,
  plugin: plugin$5
};

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
  },
  textDecoration: {
    qualifier: false
  }
};

const _excluded$1 = ["publicId", "position", "text", "effects"];
const props$4 = ['overlays'];
function plugin$4({
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
        options = _objectWithoutPropertiesLoose(_ref, _excluded$1);

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

var overlaysPlugin = {
  __proto__: null,
  props: props$4,
  plugin: plugin$4
};

const props$3 = ['rawTransformations'];
function plugin$3({
  cldImage,
  cldOptions
} = {}) {
  const {
    rawTransformations = []
  } = cldOptions;
  rawTransformations.forEach(transformation => {
    cldImage.addTransformation(transformation);
  });
}

var rawTransformationsPlugin = {
  __proto__: null,
  props: props$3,
  plugin: plugin$3
};

const props$2 = ['removeBackground'];
function plugin$2({
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

var removeBackgroundPlugin = {
  __proto__: null,
  props: props$2,
  plugin: plugin$2
};

const _excluded = ["publicId", "type", "position", "text", "effects"];
const props$1 = ['underlays'];
function plugin$1({
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
        options = _objectWithoutPropertiesLoose(_ref, _excluded);

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

var underlaysPlugin = {
  __proto__: null,
  props: props$1,
  plugin: plugin$1
};

const props = ['zoompan'];
function plugin({
  cldImage,
  cldOptions
} = {}) {
  const {
    zoompan = false
  } = cldOptions;
  const options = {};

  if (zoompan === true) {
    cldImage.effect('e_zoompan');
  } else if (typeof zoompan === 'string') {
    if (zoompan === 'loop') {
      cldImage.effect('e_zoompan');
      cldImage.effect('e_loop');
    } else {
      cldImage.effect(`e_zoompan:${zoompan}`);
    }
  } else if (typeof zoompan === 'object') {
    let zoompanEffect = 'e_zoompan';

    if (typeof zoompan.options === 'string') {
      zoompanEffect = `${zoompanEffect}${zoompan.options}`;
    }

    cldImage.effect(zoompanEffect);
    let loopEffect;

    if (zoompan.loop === true) {
      loopEffect = 'e_loop';
    } else if (typeof zoompan.loop === 'string') {
      loopEffect = `e_loop${zoompan.loop}`;
    }

    if (loopEffect) {
      cldImage.effect(loopEffect);
    }
  }

  if (zoompan !== false) {
    options.format = 'gif';
  }

  return {
    options
  };
}

var zoompanPlugin = {
  __proto__: null,
  props: props,
  plugin: plugin
};

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    // Used to avoid issues with SSR particularly for the blurred placeholder
    analytics: false
  }
});
const transformationPlugins = [// Background Removal must always come first
removeBackgroundPlugin, croppingPlugin, effectsPlugin, overlaysPlugin, underlaysPlugin, zoompanPlugin, // Raw transformations needs to be last simply to make sure
// it's always expected to applied the same way
rawTransformationsPlugin];
function cloudinaryLoader(defaultOptions, cldOptions) {
  const options = _extends({
    format: 'auto',
    quality: 'auto'
  }, defaultOptions);

  const publicId = getPublicId(options.src);
  const cldImage = cld.image(publicId);
  transformationPlugins.forEach(({
    plugin
  }) => {
    const {
      options: pluginOptions
    } = plugin({
      cldImage,
      options,
      cldOptions
    }) || {};

    if (pluginOptions != null && pluginOptions.format) {
      options.format = pluginOptions.format;
    }
  });
  return cldImage.format(options.format).delivery(`q_${options.quality}`).toURL();
}

const CldImage = props => {
  const CLD_OPTIONS = [];
  transformationPlugins.forEach(({
    props: _props = []
  }) => {
    _props.forEach(prop => {
      if (CLD_OPTIONS.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }

      CLD_OPTIONS.push(prop);
    });
  }); // Construct the base Image component props by filtering out Cloudinary-specific props

  const imageProps = {};
  Object.keys(props).filter(key => !CLD_OPTIONS.includes(key)).forEach(key => imageProps[key] = props[key]); // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  const cldOptions = {};
  CLD_OPTIONS.forEach(key => {
    if (props[key]) {
      cldOptions[key] = props[key];
    }
  }); // If we see a placeholder option, configure a Cloudinary-based URL.
  // The resulting image will always be blurred per Next.js, so we're
  // limited on options for placeholders.
  //
  // We need to do this logic here as we potentially need to mutate
  // an Image component prop as opposed to simply the URL
  //
  // https://nextjs.org/docs/api-reference/next/image#blurdataurl

  if (imageProps.placeholder) {
    const publicId = getPublicId(props.src);
    imageProps.blurDataURL = createPlaceholderUrl({
      src: publicId,
      placeholder: props.placeholder
    });

    if (imageProps.placeholder !== 'blur') {
      imageProps.placeholder = 'blur';
    }
  }

  return /*#__PURE__*/jsx(Image, _extends({}, imageProps, {
    loader: options => cloudinaryLoader(_extends({}, imageProps, {
      options
    }), cldOptions)
  }));
};

export { CldImage, cloudinaryLoader, position, primary, text };
//# sourceMappingURL=next-cloudinary.modern.mjs.map
