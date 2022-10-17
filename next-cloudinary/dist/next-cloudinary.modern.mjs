import Image from 'next/image';
import { Cloudinary } from '@cloudinary/url-gen';
import { jsx, jsxs } from 'react/jsx-runtime';
import Head from 'next/head';

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

const cropsGravityAuto = ['crop', 'fill', 'lfill', 'fill_pad', 'thumb'];
const props$6 = ['crop', 'gravity'];
function plugin$6({
  cldImage,
  options
} = {}) {
  const {
    width,
    height,
    crop = 'limit',
    gravity
  } = options;
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
  options
} = {}) {
  params.forEach(key => {
    const prop = key.prop || key;
    const effect = key.effect || key;

    if (options[prop] === true) {
      cldImage.effect(`e_${effect}`);
    } else if (typeof options[prop] === 'string') {
      cldImage.effect(`e_${effect}:${options[prop]}`);
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

const _excluded$2 = ["publicId", "position", "text", "effects"];
const props$4 = ['text', 'overlays'];
const DEFAULT_TEXT_OPTIONS = {
  color: 'black',
  fontFamily: 'Arial',
  fontSize: 200,
  fontWeight: 'bold'
};
function plugin$4({
  cldImage,
  options
} = {}) {
  const {
    text: text$1,
    overlays = []
  } = options;
  const type = 'overlay';
  const typeQualifier = 'l';

  if (Array.isArray(overlays)) {
    overlays.forEach(applyOverlay);
  }

  if (typeof text$1 === 'string') {
    applyOverlay({
      text: _extends({}, DEFAULT_TEXT_OPTIONS, {
        text: text$1
      })
    });
  } else if (typeof text$1 === 'object') {
    applyOverlay({
      text: _extends({}, DEFAULT_TEXT_OPTIONS, text$1)
    });
  }
  /**
   * applyOverlay
   */


  function applyOverlay(_ref) {
    let {
      publicId,
      position: position$1,
      text: text$1,
      effects: layerEffects = []
    } = _ref,
        options = _objectWithoutPropertiesLoose(_ref, _excluded$2);

    const hasPublicId = typeof publicId === 'string';
    const hasText = typeof text$1 === 'object' || typeof text$1 === 'string';
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
      if (typeof text$1 === 'string') {
        text$1 = _extends({}, DEFAULT_TEXT_OPTIONS, {
          text: text$1
        });
      }

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

    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;

    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(',')}`;
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  }
}

var overlaysPlugin = {
  __proto__: null,
  props: props$4,
  DEFAULT_TEXT_OPTIONS: DEFAULT_TEXT_OPTIONS,
  plugin: plugin$4
};

const props$3 = ['rawTransformations'];
function plugin$3({
  cldImage,
  options
} = {}) {
  const {
    rawTransformations = []
  } = options;
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
  options
} = {}) {
  const {
    removeBackground = false
  } = options;

  if (removeBackground) {
    cldImage.effect('e_background_removal');
  }
}

var removeBackgroundPlugin = {
  __proto__: null,
  props: props$2,
  plugin: plugin$2
};

const _excluded$1 = ["publicId", "type", "position", "text", "effects"];
const props$1 = ['underlay', 'underlays'];
function plugin$1({
  cldImage,
  options
} = {}) {
  const {
    underlay,
    underlays = []
  } = options;
  const typeQualifier = 'u';

  if (Array.isArray(underlays)) {
    underlays.forEach(applyUnderlay);
  }

  if (typeof underlay === 'string') {
    const underlayOptions = {
      publicId: underlay,
      crop: 'fill'
    };

    if (options.width) {
      underlayOptions.width = options.width;
    }

    if (options.height) {
      underlayOptions.height = options.height;
    }

    applyUnderlay(underlayOptions);
  }
  /**
   * applyUnderlay
   */


  function applyUnderlay(_ref) {
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

    layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;

    if (applied.length > 0) {
      layerTransformation = `${layerTransformation},${applied.join(',')}`;
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  }
}

var underlaysPlugin = {
  __proto__: null,
  props: props$1,
  plugin: plugin$1
};

const props = ['zoompan'];
function plugin({
  cldImage,
  options
} = {}) {
  const {
    zoompan = false
  } = options;
  const overrides = {};

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
    overrides.format = 'gif';
  }

  return {
    options: overrides
  };
}

var zoompanPlugin = {
  __proto__: null,
  props: props,
  plugin: plugin
};

const transformationPlugins = [// Background Removal must always come first
removeBackgroundPlugin, croppingPlugin, effectsPlugin, overlaysPlugin, underlaysPlugin, zoompanPlugin, // Raw transformations needs to be last simply to make sure
// it's always expected to applied the same way
rawTransformationsPlugin];
let cld;
/**
 * constructCloudinaryUrl
 */

function constructCloudinaryUrl({
  options,
  config
}) {
  if (!cld) {
    cld = new Cloudinary(_extends({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      url: {
        // Used to avoid issues with SSR particularly for the blurred placeholder
        analytics: false
      }
    }, config));
  }

  const publicId = getPublicId(options.src);
  const cldImage = cld.image(publicId);
  transformationPlugins.forEach(({
    plugin
  }) => {
    const {
      options: pluginOptions
    } = plugin({
      cldImage,
      options
    }) || {};

    if (pluginOptions != null && pluginOptions.format) {
      options.format = pluginOptions.format;
    }
  });
  return cldImage.format(options.format || 'auto').delivery(`q_${options.quality || 'auto'}`).toURL();
}
/**
 * Retrieves the public id of a cloudiary image url. If no url is recognized it returns the parameter it self.
 * If it's recognized that is a url and it's not possible to get the public id, it warns the user.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */

function getPublicId(src) {
  if (typeof src !== 'string') {
    throw new Error(`Invalid src of type ${typeof src}`);
  }

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
  placeholder = true,
  config
}) {
  const rawTransformations = [];

  if (placeholder === 'grayscale') {
    rawTransformations.push('e_grayscale');
  }

  if (typeof placeholder === 'string' && placeholder.includes('color:')) {
    const color = placeholder.split(':').splice(1).join(':');
    rawTransformations.push('e_grayscale');
    rawTransformations.push(`e_colorize:60,co_${color}`);
  }

  return constructCloudinaryUrl({
    options: {
      src,
      width: 100,
      quality: 1,
      rawTransformations
    },
    config
  });
}

function cloudinaryLoader(defaultOptions, cldOptions, cldConfig = {}) {
  return constructCloudinaryUrl({
    options: _extends({}, defaultOptions, cldOptions),
    config: cldConfig
  });
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

const _excluded = ["excludeTags", "twitterTitle"];
const IMAGE_WIDTH = 2400;
const IMAGE_HEIGHT = 1200;
const TWITTER_CARD = 'summary_large_image';

const CldOgImage = _ref => {
  let {
    excludeTags = [],
    twitterTitle
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const options = _extends({}, props, {
    width: props.width || IMAGE_WIDTH,
    height: props.height || IMAGE_HEIGHT,
    crop: props.crop || 'fill',
    gravity: props.gravity || 'center'
  });

  const ogImageUrl = constructCloudinaryUrl({
    options
  }); // We need to include the tags within the Next.js Head component rather than
  // direcly adding them inside of the Head otherwise we get unexpected results

  return /*#__PURE__*/jsxs(Head, {
    children: [/*#__PURE__*/jsx("meta", {
      property: "og:image",
      content: ogImageUrl
    }), /*#__PURE__*/jsx("meta", {
      property: "og:image:secure_url",
      content: ogImageUrl
    }), /*#__PURE__*/jsx("meta", {
      property: "og:image:width",
      content: options.width
    }), /*#__PURE__*/jsx("meta", {
      property: "og:image:height",
      content: options.height
    }), options.alt && /*#__PURE__*/jsx("meta", {
      property: "og:image:alt",
      content: options.alt
    }), !excludeTags.includes('twitter:title') && /*#__PURE__*/jsx("meta", {
      property: "twitter:title",
      content: twitterTitle || ' '
    }), /*#__PURE__*/jsx("meta", {
      property: "twitter:card",
      content: TWITTER_CARD
    }), /*#__PURE__*/jsx("meta", {
      property: "twitter:image",
      content: ogImageUrl
    })]
  });
};

export { CldImage, CldOgImage, cloudinaryLoader, position, primary, text };
//# sourceMappingURL=next-cloudinary.modern.mjs.map
