(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('next/image'), require('@cloudinary/url-gen'), require('react/jsx-runtime')) :
  typeof define === 'function' && define.amd ? define(['exports', 'next/image', '@cloudinary/url-gen', 'react/jsx-runtime'], factory) :
  (global = global || self, factory(global.nextCloudinary = {}, global.Image, global.urlGen, global.jsxRuntime));
})(this, (function (exports, Image, urlGen, jsxRuntime) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Image__default = /*#__PURE__*/_interopDefaultLegacy(Image);

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

  var primary = {
    gravity: {
      qualifier: 'g'
    },
    crop: {
      qualifier: 'c'
    },
    width: {
      qualifier: 'w'
    },
    height: {
      qualifier: 'h'
    }
  };
  var position = {
    x: {
      qualifier: 'x'
    },
    y: {
      qualifier: 'y'
    },
    gravity: {
      qualifier: 'g'
    }
  };
  var text = {
    color: {
      qualifier: 'co',
      location: 'primary'
    },
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
    textDecoration: {},
    letterSpacing: {
      qualifier: 'letter_spacing'
    }
  };

  var _excluded$1 = ["publicId", "type", "position", "text", "effects"];
  var cld = new urlGen.Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
  });
  function cloudinaryLoader(options, cldOptions) {
    var src = options.src,
        width = options.width,
        _options$format = options.format,
        format = _options$format === void 0 ? 'auto' : _options$format,
        _options$quality = options.quality,
        quality = _options$quality === void 0 ? 'auto' : _options$quality;
    var _cldOptions$overlays = cldOptions.overlays,
        overlays = _cldOptions$overlays === void 0 ? [] : _cldOptions$overlays,
        _cldOptions$removeBac = cldOptions.removeBackground,
        removeBackground = _cldOptions$removeBac === void 0 ? false : _cldOptions$removeBac,
        _cldOptions$underlays = cldOptions.underlays,
        underlays = _cldOptions$underlays === void 0 ? [] : _cldOptions$underlays;
    var cldImage = cld.image(src);

    if (removeBackground) {
      cldImage.effect('e_background_removal');
    } // Adding overlays and underlays allows you to compose your image
    // by using layering with overlays appearing on top of and udnerlays
    // appearing below your base image layer
    //
    // Learn more: https://cloudinary.com/documentation/layers


    var layers = [].concat(overlays.map(function (overlay) {
      return _extends({}, overlay, {
        type: 'overlay'
      });
    }), underlays.map(function (underlay) {
      return _extends({}, underlay, {
        type: 'underlay'
      });
    }));
    layers.forEach(function (_ref) {
      var publicId = _ref.publicId,
          type = _ref.type,
          position$1 = _ref.position,
          text$1 = _ref.text,
          _ref$effects = _ref.effects,
          layerEffects = _ref$effects === void 0 ? [] : _ref$effects,
          options = _objectWithoutPropertiesLoose(_ref, _excluded$1);

      var hasPublicId = typeof publicId === 'string';
      var hasText = typeof text$1 === 'object';
      var hasPosition = typeof position$1 === 'object';

      if (!hasPublicId && !hasText) {
        console.warn(type + " is missing Public ID or Text");
        return;
      } // Determine the qualifier for the type of layer


      var typeQualifier;

      if (type === 'overlay') {
        typeQualifier = 'l';
      } else if (type === 'underlay') {
        typeQualifier = 'u';
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
    return cldImage.resize("c_limit,w_" + width).format(format).delivery("q_" + quality).toURL();
  }

  var _excluded = ["overlays", "removeBackground", "underlays"];

  var CldImage = function CldImage(_ref) {
    var overlays = _ref.overlays,
        removeBackground = _ref.removeBackground,
        underlays = _ref.underlays,
        props = _objectWithoutPropertiesLoose(_ref, _excluded);

    var cldOptions = {
      overlays: overlays,
      removeBackground: removeBackground,
      underlays: underlays
    };
    return /*#__PURE__*/jsxRuntime.jsx(Image__default["default"], _extends({}, props, {
      loader: function loader(options) {
        return cloudinaryLoader(options, cldOptions);
      }
    }));
  };

  exports.CldImage = CldImage;
  exports.cloudinaryLoader = cloudinaryLoader;
  exports.position = position;
  exports.primary = primary;
  exports.text = text;

}));
//# sourceMappingURL=next-cloudinary.umd.js.map
