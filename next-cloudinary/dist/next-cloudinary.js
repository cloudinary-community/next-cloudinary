var urlGen = require('@cloudinary/url-gen');
var Image = require('next/image');
var jsxRuntime = require('react/jsx-runtime');

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

var _excluded = ["effects", "removeBackground"];
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
  var _cldOptions$effects = cldOptions.effects,
      effects = _cldOptions$effects === void 0 ? [] : _cldOptions$effects,
      _cldOptions$removeBac = cldOptions.removeBackground,
      removeBackground = _cldOptions$removeBac === void 0 ? false : _cldOptions$removeBac;
  var cldImage = cld.image(src);

  if (removeBackground) {
    cldImage.effect('e_background_removal');
  }

  effects.forEach(function (effect) {
    return cldImage.effect(effect);
  });
  return cldImage.resize("c_limit,w_" + width).format(format).delivery("q_" + quality).toURL();
}

var CldImage = function CldImage(_ref) {
  var effects = _ref.effects,
      removeBackground = _ref.removeBackground,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var cldOptions = {
    effects: effects,
    removeBackground: removeBackground
  };
  return /*#__PURE__*/jsxRuntime.jsx(Image__default["default"], _extends({}, props, {
    loader: function loader(options) {
      return cloudinaryLoader(options, cldOptions);
    }
  }));
};

exports.CldImage = CldImage;
//# sourceMappingURL=next-cloudinary.js.map
