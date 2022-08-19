import { Cloudinary } from '@cloudinary/url-gen';
import Image from 'next/image';
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

const _excluded = ["effects", "removeBackground"];
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

function cloudinaryLoader(options, cldOptions) {
  const {
    src,
    width,
    format = 'auto',
    quality = 'auto'
  } = options;
  const {
    effects = [],
    removeBackground = false
  } = cldOptions;
  const cldImage = cld.image(src);

  if (removeBackground) {
    cldImage.effect('e_background_removal');
  }

  effects.forEach(effect => cldImage.effect(effect));
  return cldImage.resize(`c_limit,w_${width}`).format(format).delivery(`q_${quality}`).toURL();
}

const CldImage = _ref => {
  let {
    effects,
    removeBackground
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  const cldOptions = {
    effects,
    removeBackground
  };
  return /*#__PURE__*/jsx(Image, _extends({}, props, {
    loader: options => cloudinaryLoader(options, cldOptions)
  }));
};

export { CldImage };
//# sourceMappingURL=next-cloudinary.modern.mjs.map
