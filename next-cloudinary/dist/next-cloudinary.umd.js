(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('next/image'), require('@cloudinary/url-gen'), require('react/jsx-runtime'), require('next/head'), require('react'), require('next/script')) :
  typeof define === 'function' && define.amd ? define(['exports', 'next/image', '@cloudinary/url-gen', 'react/jsx-runtime', 'next/head', 'react', 'next/script'], factory) :
  (global = global || self, factory(global.nextCloudinary = {}, global.Image, global.urlGen, global.jsxRuntime, global.Head, global.react, global.Script));
})(this, (function (exports, Image, urlGen, jsxRuntime, Head, react, Script) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Image__default = /*#__PURE__*/_interopDefaultLegacy(Image);
  var Head__default = /*#__PURE__*/_interopDefaultLegacy(Head);
  var Script__default = /*#__PURE__*/_interopDefaultLegacy(Script);

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

  var cropsGravityAuto = ['crop', 'fill', 'lfill', 'fill_pad', 'thumb'];
  var props$6 = ['crop', 'gravity'];
  function plugin$6(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cldImage = _ref.cldImage,
        options = _ref.options;

    var width = options.width,
        height = options.height,
        _options$crop = options.crop,
        crop = _options$crop === void 0 ? 'limit' : _options$crop;
    var transformationString = "c_" + crop + ",w_" + width;

    if (!options.gravity && cropsGravityAuto.includes(crop)) {
      options.gravity = 'auto';
    }

    if (!['limit'].includes(crop)) {
      transformationString = transformationString + ",h_" + height;
    }

    if (options.gravity) {
      if (options.gravity === 'auto' && !cropsGravityAuto.includes(crop)) {
        console.warn('Auto gravity can only be used with crop, fill, lfill, fill_pad or thumb. Not applying gravity.');
      } else {
        transformationString = transformationString + ",g_" + options.gravity;
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
        options = _ref.options;

    params.forEach(function (key) {
      var prop = key.prop || key;
      var effect = key.effect || key;

      if (options[prop] === true) {
        cldImage.effect("e_" + effect);
      } else if (typeof options[prop] === 'string') {
        cldImage.effect("e_" + effect + ":" + options[prop]);
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

  var _excluded$3 = ["publicId", "position", "text", "effects"];
  var props$4 = ['text', 'overlays'];
  var DEFAULT_TEXT_OPTIONS = {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: 200,
    fontWeight: 'bold'
  };
  function plugin$4(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cldImage = _ref.cldImage,
        options = _ref.options;

    var text$1 = options.text,
        _options$overlays = options.overlays,
        overlays = _options$overlays === void 0 ? [] : _options$overlays;
    var type = 'overlay';
    var typeQualifier = 'l';

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


    function applyOverlay(_ref2) {
      var publicId = _ref2.publicId,
          position$1 = _ref2.position,
          text$1 = _ref2.text,
          _ref2$effects = _ref2.effects,
          layerEffects = _ref2$effects === void 0 ? [] : _ref2$effects,
          options = _objectWithoutPropertiesLoose(_ref2, _excluded$3);

      var hasPublicId = typeof publicId === 'string';
      var hasText = typeof text$1 === 'object' || typeof text$1 === 'string';
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
        if (typeof text$1 === 'string') {
          text$1 = _extends({}, DEFAULT_TEXT_OPTIONS, {
            text: text$1
          });
        }

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

      layerTransformation = layerTransformation + "/fl_layer_apply,fl_no_overflow";

      if (applied.length > 0) {
        layerTransformation = layerTransformation + "," + applied.join(',');
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

  var props$3 = ['rawTransformations'];
  function plugin$3(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cldImage = _ref.cldImage,
        options = _ref.options;

    var _options$rawTransform = options.rawTransformations,
        rawTransformations = _options$rawTransform === void 0 ? [] : _options$rawTransform;
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
        options = _ref.options;

    var _options$removeBackgr = options.removeBackground,
        removeBackground = _options$removeBackgr === void 0 ? false : _options$removeBackgr;

    if (removeBackground) {
      cldImage.effect('e_background_removal');
    }
  }

  var removeBackgroundPlugin = {
    __proto__: null,
    props: props$2,
    plugin: plugin$2
  };

  var _excluded$2 = ["publicId", "type", "position", "text", "effects"];
  var props$1 = ['underlay', 'underlays'];
  function plugin$1(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cldImage = _ref.cldImage,
        options = _ref.options;

    var underlay = options.underlay,
        _options$underlays = options.underlays,
        underlays = _options$underlays === void 0 ? [] : _options$underlays;
    var typeQualifier = 'u';

    if (Array.isArray(underlays)) {
      underlays.forEach(applyUnderlay);
    }

    if (typeof underlay === 'string') {
      var underlayOptions = {
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


    function applyUnderlay(_ref2) {
      var publicId = _ref2.publicId,
          type = _ref2.type,
          position$1 = _ref2.position,
          _ref2$effects = _ref2.effects,
          layerEffects = _ref2$effects === void 0 ? [] : _ref2$effects,
          options = _objectWithoutPropertiesLoose(_ref2, _excluded$2);

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

      layerTransformation = layerTransformation + "/fl_layer_apply,fl_no_overflow";

      if (applied.length > 0) {
        layerTransformation = layerTransformation + "," + applied.join(',');
      } // Finally add it to the image


      cldImage.addTransformation(layerTransformation);
    }
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
        options = _ref.options;

    var _options$zoompan = options.zoompan,
        zoompan = _options$zoompan === void 0 ? false : _options$zoompan;
    var overrides = {};

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

  var transformationPlugins = [// Background Removal must always come first
  removeBackgroundPlugin, croppingPlugin, effectsPlugin, overlaysPlugin, underlaysPlugin, zoompanPlugin, // Raw transformations needs to be last simply to make sure
  // it's always expected to applied the same way
  rawTransformationsPlugin];
  var cld;
  /**
   * constructCloudinaryUrl
   */

  function constructCloudinaryUrl(_ref) {
    var options = _ref.options,
        config = _ref.config;

    if (!cld) {
      cld = new urlGen.Cloudinary(_extends({
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        },
        url: {
          // Used to avoid issues with SSR particularly for the blurred placeholder
          analytics: false
        }
      }, config));
    }

    var publicId = getPublicId(options.src);
    var cldImage = cld.image(publicId);
    transformationPlugins.forEach(function (_ref2) {
      var plugin = _ref2.plugin;

      var _ref3 = plugin({
        cldImage: cldImage,
        options: options
      }) || {},
          pluginOptions = _ref3.options;

      if (pluginOptions != null && pluginOptions.format) {
        options.format = pluginOptions.format;
      }
    });
    return cldImage.setDeliveryType(options.deliveryType || 'upload').format(options.format || 'auto').delivery("q_" + (options.quality || 'auto')).toURL();
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
      throw new Error("Invalid src of type " + typeof src);
    }

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

  function createPlaceholderUrl(_ref4) {
    var src = _ref4.src,
        _ref4$placeholder = _ref4.placeholder,
        placeholder = _ref4$placeholder === void 0 ? true : _ref4$placeholder,
        config = _ref4.config;
    var rawTransformations = [];

    if (placeholder === 'grayscale') {
      rawTransformations.push('e_grayscale');
    }

    if (typeof placeholder === 'string' && placeholder.includes('color:')) {
      var color = placeholder.split(':').splice(1).join(':');
      rawTransformations.push('e_grayscale');
      rawTransformations.push("e_colorize:60,co_" + color);
    }

    return constructCloudinaryUrl({
      options: {
        src: src,
        width: 100,
        quality: 1,
        rawTransformations: rawTransformations
      },
      config: config
    });
  }

  function cloudinaryLoader(defaultOptions, cldOptions, cldConfig) {
    if (cldConfig === void 0) {
      cldConfig = {};
    }

    return constructCloudinaryUrl({
      options: _extends({}, defaultOptions, cldOptions),
      config: cldConfig
    });
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

    return /*#__PURE__*/jsxRuntime.jsx(Image__default["default"], _extends({}, imageProps, {
      loader: function loader(options) {
        return cloudinaryLoader(_extends({}, imageProps, {
          options: options
        }), cldOptions);
      }
    }));
  };

  var _excluded$1 = ["excludeTags", "twitterTitle"];
  var IMAGE_WIDTH = 2400;
  var IMAGE_HEIGHT = 1200;
  var TWITTER_CARD = 'summary_large_image';

  var CldOgImage = function CldOgImage(_ref) {
    var _ref$excludeTags = _ref.excludeTags,
        excludeTags = _ref$excludeTags === void 0 ? [] : _ref$excludeTags,
        twitterTitle = _ref.twitterTitle,
        props = _objectWithoutPropertiesLoose(_ref, _excluded$1);

    var options = _extends({}, props, {
      width: props.width || IMAGE_WIDTH,
      height: props.height || IMAGE_HEIGHT,
      crop: props.crop || 'fill',
      gravity: props.gravity || 'center'
    });

    var ogImageUrl = constructCloudinaryUrl({
      options: options
    }); // We need to include the tags within the Next.js Head component rather than
    // direcly adding them inside of the Head otherwise we get unexpected results

    return /*#__PURE__*/jsxRuntime.jsxs(Head__default["default"], {
      children: [/*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image",
        content: ogImageUrl
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image:secure_url",
        content: ogImageUrl
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image:width",
        content: options.width
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image:height",
        content: options.height
      }), options.alt && /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "og:image:alt",
        content: options.alt
      }), !excludeTags.includes('twitter:title') && /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "twitter:title",
        content: twitterTitle || ' '
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "twitter:card",
        content: TWITTER_CARD
      }), /*#__PURE__*/jsxRuntime.jsx("meta", {
        property: "twitter:image",
        content: ogImageUrl
      })]
    });
  };

  var CldUploadWidget = function CldUploadWidget(_ref) {
    var children = _ref.children,
        onUpload = _ref.onUpload,
        options = _ref.options,
        signed = _ref.signed,
        signatureEndpoint = _ref.signatureEndpoint;
    var cloudinary = react.useRef();
    var widget = react.useRef();
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

    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        open: open
      }), /*#__PURE__*/jsxRuntime.jsx(Script__default["default"], {
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

    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx(CldUploadWidget, {
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

          return /*#__PURE__*/jsxRuntime.jsx("button", _extends({
            onClick: handleOnClick
          }, props, {
            children: _children
          }));
        }
      })
    });
  };

  exports.CldImage = CldImage;
  exports.CldOgImage = CldOgImage;
  exports.CldUploadButton = CldUploadButton;
  exports.CldUploadWidget = CldUploadWidget;
  exports.cloudinaryLoader = cloudinaryLoader;
  exports.position = position;
  exports.primary = primary;
  exports.text = text;

}));
//# sourceMappingURL=next-cloudinary.umd.js.map
