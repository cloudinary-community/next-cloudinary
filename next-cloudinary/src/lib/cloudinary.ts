import { Cloudinary } from '@cloudinary/url-gen';
import nextPkg from 'next/package.json';

import * as croppingPlugin from '../plugins/cropping';
import * as effectsPlugin from '../plugins/effects';
import * as overlaysPlugin from '../plugins/overlays';
import * as namedTransformationsPlugin from '../plugins/named-transformations';
import * as rawTransformationsPlugin from '../plugins/raw-transformations';
import * as removeBackgroundPlugin from '../plugins/remove-background';
import * as underlaysPlugin from '../plugins/underlays';
import * as zoompanPlugin from '../plugins/zoompan';
import ICloudinaryConfigurations from '@cloudinary/url-gen/config/interfaces/Config/ICloudinaryConfigurations';

import { NEXT_CLOUDINARY_ANALYTICS_ID } from '../constants/analytics';

import pkg from '../../package.json';

export const transformationPlugins = [
  // Background Removal must always come first
  removeBackgroundPlugin,

  croppingPlugin,
  effectsPlugin,
  overlaysPlugin,
  namedTransformationsPlugin,
  underlaysPlugin,
  zoompanPlugin,

  // Raw transformations needs to be last simply to make sure
  // it's always expected to applied the same way

  rawTransformationsPlugin
];

let cld: any;

interface ImageUrlOptions{
  src?: string;
  width?: number;
  quality?: number;
  deliveryType?: string;
  format?: string;
  rawTransformations?: string[];
  resize?: {
    crop?: string;
    width?: number;
  }
}

interface ConstructUrlProps {
  options?: ImageUrlOptions;
  config?: ICloudinaryConfigurations;
}

/**
 * constructCloudinaryUrl
 */

export function constructCloudinaryUrl({ options, config }: ConstructUrlProps): string {
  if ( !cld ) {
    cld = new Cloudinary({
      cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      },
      ...config
    });
  }

  const publicId = getPublicId(options?.src);

  const cldImage = cld.image(publicId);

  transformationPlugins.forEach(({ plugin }) => {
    // @ts-ignore
    const { options: pluginOptions } = plugin({
      cldImage,
      options
    }) || {};

    if ( pluginOptions?.format && options ) {
      options.format = pluginOptions.format;
    }

    if ( pluginOptions?.width && options ) {
      options.resize = {
        width: pluginOptions?.width
      };
    }
  });

  if ( options?.resize ) {
    const { width, crop = 'scale' } = options.resize;
    cldImage.effect(`c_${crop},w_${width}`);
  }

  return cldImage
          .setDeliveryType(options?.deliveryType || 'upload')
          .format(options?.format || 'auto')
          .delivery(`q_${options?.quality || 'auto'}`)
          .toURL({
            trackedAnalytics: {
              sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
              sdkSemver: pkg.version,
              techVersion: nextPkg.version
            }
          });
}

/**
 * Retrieves the public id of a cloudiary image url. If no url is recognized it returns the parameter it self.
 * If it's recognized that is a url and it's not possible to get the public id, it warns the user.
 *
 * @param {string} src The cloudiary url or public id.
 *
 * @return {string} The images public id
 */

export function getPublicId(src): string {
  if ( typeof src !== 'string' ) {
    throw new Error(`Invalid src of type ${typeof src}`);
  }

  if ( src.includes('res.cloudinary.com') ) {
    const regexWithTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(.*)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/
    const regexWithoutTransformations = /(https?)\:\/\/(res.cloudinary.com)\/([^\/]+)\/(image|video|raw)\/(upload|authenticated)\/(v[0-9]+)\/(.+)(?:\.[a-z]{3})?/

    const withTransformations = src.match(regexWithTransformations)
    const withoutTransformations = src.match(regexWithoutTransformations)

    if ( withTransformations ) {
      return withTransformations[withTransformations.length - 1]
    } else if ( withoutTransformations ) {
      return withoutTransformations[withoutTransformations.length - 1]
    } else {
      console.warn(`Not possible to retrieve the publicUrl from ${src}, make sure it's a valid cloudinary image url.`)
    }
  }

  return src;
}

/**
 * createPlaceholderUrl
 */

export function createPlaceholderUrl({ src, placeholder = true, config }: { src?: any, placeholder?: boolean | string, config?: any }) {
  const rawTransformations: string[] = [];

  if ( placeholder === 'grayscale' ) {
    rawTransformations.push('e_grayscale');
  }

  if ( typeof placeholder === 'string' && placeholder.includes('color:') ) {
    const color = placeholder.split(':').splice(1).join(':')
    rawTransformations.push('e_grayscale');
    rawTransformations.push(`e_colorize:60,co_${color}`);
  }

  return constructCloudinaryUrl({
    options: {
      src,
      width: 100,
      quality: 1,
      rawTransformations,
    },
    config
  });
}

/**
 * pollForProcessingImage
 */

export async function pollForProcessingImage(options): Promise<boolean> {
  const { src } = options;
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then(res => {
        if ( !res.ok ) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  } catch(e: any) {
    if ( e.status === 423 ) {
      return await pollForProcessingImage(options);
    }
    return false;
  }
  return true;
}