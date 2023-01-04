/**
 * constructTransformation
 */

export function constructTransformation({ prefix, qualifier, value }) {
  let transformation = '';

  if ( prefix ) {
    transformation = `${prefix}_`;
  }

  if ( value === true || value === 'true' ) {
    return `${transformation}${qualifier}`;
  }

  if ( typeof value === 'string' || typeof value === 'number' ) {
    if ( prefix ) {
      return `${transformation}${qualifier}:${value}`;
    } else {
      return `${qualifier}_${value}`;
    }
  }
}


/**
 * Retrieves the transformations added to a cloudiary image url. If no transformation is recognized it returns an empty array.
 *
 * @param {string} src The cloudiary url.
 *
 * @return {array} The array of transformations
 */

export function getTransformations(src, preserveTransformations) {
  if (typeof src !== "string") {
    throw new Error(`Invalid src of type ${typeof src}`);
  }

  if (src.includes("res.cloudinary.com") && preserveTransformations) {
    const regex = new RegExp(
      "(https?)://(res.cloudinary.com)/([^/]+)/(image|video|raw)/(upload|authenticated)/(.*)/(v[0-9]+)/(.+)(?:.[a-z]{3})?",
      "gi"
    );
    const groups = regex.exec(src);
    const transformationStr = groups.slice(1).find((i) => i.includes("_"));

    if (transformationStr) {
      return transformationStr.split(",").join("/").split("/");
    } else {
      return [];
    }
  }

  return [];
}