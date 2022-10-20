import Image from 'next/image';
import { Cloudinary } from '@cloudinary/url-gen';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useRef } from 'react';
import Script from 'next/script';

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

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

var cld$1 = new Cloudinary({
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
    var regexWithTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(.*)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/;
    var regexWithoutTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/;
    var withTransformations = src.match(regexWithTransformations);
    var withoutTransformations = src.match(regexWithoutTransformations);

    if (withTransformations) {
      return withTransformations[withTransformations.length - 1];
    } else if (withoutTransformations) {
      return withoutTransformations[withoutTransformations.length - 1];
    } else {
      console.warn("Not possible to retrieve the publicUrl from " + src + ", make sure it's a valid cloudinary image url.");
    }
  }

  return src;
}
/**
 * createPlaceholderUrl
 */

function createPlaceholderUrl(_ref) {
  var src = _ref.src,
      placeholder = _ref.placeholder;
  var cldImage = cld$1.image(src).resize('c_limit,w_100').delivery('q_1').format('auto');

  if (placeholder === 'grayscale') {
    cldImage.effect('e_grayscale');
  }

  if (placeholder.includes('color:')) {
    var color = placeholder.split(':').splice(1).join(':');
    cldImage.effect('e_grayscale');
    cldImage.effect("e_colorize:60,co_" + color);
  }

  return cldImage.toURL();
}

var cropsGravityAuto = ['crop', 'fill', 'lfill', 'fill_pad', 'thumb'];
var props$6 = ['crop', 'gravity'];
function plugin$6(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      options = _ref.options,
      cldOptions = _ref.cldOptions;

  var width = options.width,
      height = options.height;
  var _cldOptions$crop = cldOptions.crop,
      crop = _cldOptions$crop === void 0 ? 'limit' : _cldOptions$crop,
      gravity = cldOptions.gravity;
  var transformationString = "c_" + crop + ",w_" + width;

  if (!gravity && cropsGravityAuto.includes(crop)) {
    _readOnlyError("gravity");
  }

  if (!['limit'].includes(crop)) {
    transformationString = transformationString + ",h_" + height;
  }

  if (gravity) {
    if (gravity === 'auto' && !cropsGravityAuto.includes(crop)) {
      console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
    } else {
      transformationString = transformationString + ",g_" + gravity;
    }
  }

  cldImage.resize(transformationString);
}

var croppingPlugin = {
  __proto__: null,
  props: props$6,
  plugin: plugin$6
};

var params = ['art', {
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
var props$5 = params.map(function (param) {
  return param.prop || param;
});
function plugin$5(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  params.forEach(function (key) {
    var prop = key.prop || key;
    var effect = key.effect || key;

    if (prop === 'oilPaint' && cldOptions[prop]) {
      console.log('cldOptions[prop]', cldOptions[prop]);
    }

    if (cldOptions[prop] === true) {
      cldImage.effect("e_" + effect);
    } else if (typeof cldOptions[prop] === 'string') {
      cldImage.effect("e_" + effect + ":" + cldOptions[prop]);
    }
  });
}

var effectsPlugin = {
  __proto__: null,
  props: props$5,
  plugin: plugin$5
};

// aspectRatio
var primary = {
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
var position = {
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
var text = {
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

var _excluded$2 = ["publicId", "position", "text", "effects"];
var props$4 = ['overlays'];
function plugin$4(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  var _cldOptions$overlays = cldOptions.overlays,
      overlays = _cldOptions$overlays === void 0 ? [] : _cldOptions$overlays;
  var type = 'overlay';
  var typeQualifier = 'l';
  overlays.forEach(function (_ref2) {
    var publicId = _ref2.publicId,
        position$1 = _ref2.position,
        text$1 = _ref2.text,
        _ref2$effects = _ref2.effects,
        layerEffects = _ref2$effects === void 0 ? [] : _ref2$effects,
        options = _objectWithoutPropertiesLoose(_ref2, _excluded$2);

    var hasPublicId = typeof publicId === 'string';
    var hasText = typeof text$1 === 'object';
    var hasPosition = typeof position$1 === 'object';

    if (!hasPublicId && !hasText) {
      console.warn("An " + type + " is missing Public ID or Text");
      return;
    } // Start to construct the transformation string using text or the public ID
    // if it's image-based


    var layerTransformation;

    if (hasText) {
      layerTransformation = typeQualifier + "_text";
    } else {
      layerTransformation = typeQualifier + "_" + publicId.replace(/\//g, ':');
    } // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL


    var primary$1 = [];
    var applied = []; // Gemeral options

    Object.keys(options).forEach(function (key) {
      if (!primary[key]) return;
      var qualifier = primary[key].qualifier;
      primary$1.push(qualifier + "_" + options[key]);
    }); // Layer effects

    layerEffects.forEach(function (effect) {
      Object.keys(effect).forEach(function (key) {
        if (!primary[key]) return;
        var qualifier = primary[key].qualifier;
        primary$1.push(qualifier + "_" + effect[key]);
      });
    }); // Text styling

    if (hasText) {
      var textTransformations = [];
      Object.keys(text$1).forEach(function (key) {
        if (!text[key]) return;
        var _qualifiersText$key = text[key],
            qualifier = _qualifiersText$key.qualifier,
            location = _qualifiersText$key.location;

        if (location === 'primary') {
          primary$1.push(qualifier + "_" + text$1[key]);
        } else {
          textTransformations.push(text$1[key]);
        }
      });
      layerTransformation = layerTransformation + ":" + textTransformations.join('_') + ":" + text$1.text;
    } // Positioning


    if (hasPosition) {
      Object.keys(position$1).forEach(function (key) {
        if (!position[key]) return;
        var qualifier = position[key].qualifier;
        applied.push(qualifier + "_" + position$1[key]);
      });
    } // Add all primary transformations


    layerTransformation = layerTransformation + "," + primary$1.join(','); // Add all applied transformations

    layerTransformation = layerTransformation + "/fl_layer_apply";

    if (applied.length > 0) {
      layerTransformation = layerTransformation + "," + applied.join(',');
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  });
}

var overlaysPlugin = {
  __proto__: null,
  props: props$4,
  plugin: plugin$4
};

var props$3 = ['rawTransformations'];
function plugin$3(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  var _cldOptions$rawTransf = cldOptions.rawTransformations,
      rawTransformations = _cldOptions$rawTransf === void 0 ? [] : _cldOptions$rawTransf;
  rawTransformations.forEach(function (transformation) {
    cldImage.addTransformation(transformation);
  });
}

var rawTransformationsPlugin = {
  __proto__: null,
  props: props$3,
  plugin: plugin$3
};

var props$2 = ['removeBackground'];
function plugin$2(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  var _cldOptions$removeBac = cldOptions.removeBackground,
      removeBackground = _cldOptions$removeBac === void 0 ? false : _cldOptions$removeBac;

  if (removeBackground) {
    cldImage.effect('e_background_removal');
  }
}

var removeBackgroundPlugin = {
  __proto__: null,
  props: props$2,
  plugin: plugin$2
};

var _excluded$1 = ["publicId", "type", "position", "text", "effects"];
var props$1 = ['underlays'];
function plugin$1(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  var _cldOptions$underlays = cldOptions.underlays,
      underlays = _cldOptions$underlays === void 0 ? [] : _cldOptions$underlays;
  var typeQualifier = 'u';
  underlays.forEach(function (_ref2) {
    var publicId = _ref2.publicId,
        type = _ref2.type,
        position$1 = _ref2.position,
        _ref2$effects = _ref2.effects,
        layerEffects = _ref2$effects === void 0 ? [] : _ref2$effects,
        options = _objectWithoutPropertiesLoose(_ref2, _excluded$1);

    var hasPublicId = typeof publicId === 'string';
    var hasPosition = typeof position$1 === 'object';

    if (!hasPublicId) {
      console.warn("An " + type + " is missing a Public ID");
      return;
    } // Start to construct the transformation string using text or the public ID
    // if it's image-based


    var layerTransformation = typeQualifier + "_" + publicId.replace(/\//g, ':'); // Begin organizing transformations based on what it is and the location
    // it needs to be placed in the URL

    var primary$1 = [];
    var applied = []; // Gemeral options

    Object.keys(options).forEach(function (key) {
      if (!primary[key]) return;
      var qualifier = primary[key].qualifier;
      primary$1.push(qualifier + "_" + options[key]);
    }); // Layer effects

    layerEffects.forEach(function (effect) {
      Object.keys(effect).forEach(function (key) {
        if (!primary[key]) return;
        var qualifier = primary[key].qualifier;
        primary$1.push(qualifier + "_" + effect[key]);
      });
    }); // Positioning

    if (hasPosition) {
      Object.keys(position$1).forEach(function (key) {
        if (!position[key]) return;
        var qualifier = position[key].qualifier;
        applied.push(qualifier + "_" + position$1[key]);
      });
    } // Add all primary transformations


    layerTransformation = layerTransformation + "," + primary$1.join(','); // Add all applied transformations

    layerTransformation = layerTransformation + "/fl_layer_apply";

    if (applied.length > 0) {
      layerTransformation = layerTransformation + "," + applied.join(',');
    } // Finally add it to the image


    cldImage.addTransformation(layerTransformation);
  });
}

var underlaysPlugin = {
  __proto__: null,
  props: props$1,
  plugin: plugin$1
};

var props = ['zoompan'];
function plugin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      cldImage = _ref.cldImage,
      cldOptions = _ref.cldOptions;

  var _cldOptions$zoompan = cldOptions.zoompan,
      zoompan = _cldOptions$zoompan === void 0 ? false : _cldOptions$zoompan;
  var options = {};

  if (zoompan === true) {
    cldImage.effect('e_zoompan');
  } else if (typeof zoompan === 'string') {
    if (zoompan === 'loop') {
      cldImage.effect('e_zoompan');
      cldImage.effect('e_loop');
    } else {
      cldImage.effect("e_zoompan:" + zoompan);
    }
  } else if (typeof zoompan === 'object') {
    var zoompanEffect = 'e_zoompan';

    if (typeof zoompan.options === 'string') {
      zoompanEffect = "" + zoompanEffect + zoompan.options;
    }

    cldImage.effect(zoompanEffect);
    var loopEffect;

    if (zoompan.loop === true) {
      loopEffect = 'e_loop';
    } else if (typeof zoompan.loop === 'string') {
      loopEffect = "e_loop" + zoompan.loop;
    }

    if (loopEffect) {
      cldImage.effect(loopEffect);
    }
  }

  if (zoompan !== false) {
    options.format = 'gif';
  }

  return {
    options: options
  };
}

var zoompanPlugin = {
  __proto__: null,
  props: props,
  plugin: plugin
};

var cld;
var transformationPlugins = [// Background Removal must always come first
removeBackgroundPlugin, croppingPlugin, effectsPlugin, overlaysPlugin, underlaysPlugin, zoompanPlugin, // Raw transformations needs to be last simply to make sure
// it's always expected to applied the same way
rawTransformationsPlugin];
function cloudinaryLoader(defaultOptions, cldOptions, cldConfig) {
  if (cldConfig === void 0) {
    cldConfig = {};
  }

  if (!cld) {
    cld = new Cloudinary(_extends({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      url: {
        // Used to avoid issues with SSR particularly for the blurred placeholder
        analytics: false
      }
    }, cldConfig));
  }

  var options = _extends({
    format: 'auto',
    quality: 'auto'
  }, defaultOptions);

  var publicId = getPublicId(options.src);
  var cldImage = cld.image(publicId);
  transformationPlugins.forEach(function (_ref) {
    var plugin = _ref.plugin;

    var _ref2 = plugin({
      cldImage: cldImage,
      options: options,
      cldOptions: cldOptions
    }) || {},
        pluginOptions = _ref2.options;

    if (pluginOptions != null && pluginOptions.format) {
      options.format = pluginOptions.format;
    }
  });
  return cldImage.format(options.format).delivery("q_" + options.quality).toURL();
}

var CldImage = function CldImage(props) {
  var CLD_OPTIONS = [];
  transformationPlugins.forEach(function (_ref) {
    var _ref$props = _ref.props,
        props = _ref$props === void 0 ? [] : _ref$props;
    props.forEach(function (prop) {
      if (CLD_OPTIONS.includes(prop)) {
        throw new Error("Option " + prop + " already exists!");
      }

      CLD_OPTIONS.push(prop);
    });
  }); // Construct the base Image component props by filtering out Cloudinary-specific props

  var imageProps = {};
  Object.keys(props).filter(function (key) {
    return !CLD_OPTIONS.includes(key);
  }).forEach(function (key) {
    return imageProps[key] = props[key];
  }); // Construct Cloudinary-specific props by looking for values for any of the supported prop keys

  var cldOptions = {};
  CLD_OPTIONS.forEach(function (key) {
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
    var publicId = getPublicId(props.src);
    imageProps.blurDataURL = createPlaceholderUrl({
      src: publicId,
      placeholder: props.placeholder
    });

    if (imageProps.placeholder !== 'blur') {
      imageProps.placeholder = 'blur';
    }
  }

  return /*#__PURE__*/jsx(Image, _extends({}, imageProps, {
    loader: function loader(options) {
      return cloudinaryLoader(_extends({}, imageProps, {
        options: options
      }), cldOptions);
    }
  }));
};

var CldUploadWidget = function CldUploadWidget(_ref) {
  var children = _ref.children,
      onUpload = _ref.onUpload,
      options = _ref.options,
      signed = _ref.signed,
      signatureEndpoint = _ref.signatureEndpoint;
  var cloudinary = useRef();
  var widget = useRef();
  /**
   * generateSignature
   * @description Makes a request to an endpoint to sign Cloudinary parameters as part of widget creation
   */

  function generateSignature(callback, paramsToSign) {
    fetch(signatureEndpoint, {
      method: "POST",
      body: JSON.stringify({
        paramsToSign: paramsToSign
      })
    }).then(function (r) {
      return r.json();
    }).then(function (_ref2) {
      var signature = _ref2.signature;
      callback(signature);
    });
  }
  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */


  function createWidget() {
    var _cloudinary$current;

    // When creating a signed upload, you need to provide both your Cloudinary API Key
    // as well as a signature generator function that will sign any paramters
    // either on page load or during the upload process. Read more about signed uploads at:
    // https://cloudinary.com/documentation/upload_widget#signed_uploads
    var totalOptions = _extends({}, options, !!signed && {
      uploadSignature: generateSignature
    }); // no need for apiSecret because of api/sign-cloudinary-params


    if (signed && !totalOptions.apiKey) {
      return new Error("Signed Upload needs apiKey!");
    }

    return (_cloudinary$current = cloudinary.current) == null ? void 0 : _cloudinary$current.createUploadWidget(totalOptions, function (error, result) {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurance
      if (error || result.event === "success") {
        onUpload(error, result, widget == null ? void 0 : widget.current);
      }
    });
  }
  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */


  function open() {
    if (!(widget != null && widget.current)) {
      widget.current = createWidget();
    }

    (widget == null ? void 0 : widget.current) && widget.current.open();
  }
  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */


  function handleOnLoad() {
    cloudinary.current = window.cloudinary;
  }

  return /*#__PURE__*/jsxs(Fragment, {
    children: [children({
      cloudinary: cloudinary.current,
      widget: widget.current,
      open: open
    }), /*#__PURE__*/jsx(Script, {
      id: "cloudinary-" + Math.floor(Math.random() * 100),
      src: "https://widget.cloudinary.com/v2.0/global/all.js",
      onLoad: handleOnLoad,
      onError: function onError(e) {
        console.error("Script failed to load", e);
      }
    })]
  });
};

var _excluded = ["onUpload", "options", "signed", "label", "children"];

var CldUploadButton = function CldUploadButton(_ref) {
  var onUpload = _ref.onUpload,
      options = _ref.options,
      signed = _ref.signed,
      _children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx(CldUploadWidget, {
      signed: signed,
      options: options,
      onUpload: onUpload,
      signatureEndpoint: signed != null ? signed : props.signatureEndpoint,
      children: function children(_ref2) {
        var open = _ref2.open;

        function handleOnClick(e) {
          e.preventDefault();
          open();
        }

        return /*#__PURE__*/jsx("button", _extends({
          onClick: handleOnClick
        }, props, {
          children: _children
        }));
      }
    })
  });
};

export { CldImage, CldUploadButton, CldUploadWidget, cloudinaryLoader, position, primary, text };
//# sourceMappingURL=next-cloudinary.module.js.map
