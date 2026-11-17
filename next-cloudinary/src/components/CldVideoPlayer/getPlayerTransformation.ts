import type { CloudinaryVideoPlayerOptions } from '@cloudinary-util/types';

import type { CldVideoPlayerProps } from './CldVideoPlayer.types';

/**
 * getPlayerTransformation
 * @description getVideoPlayerOptions passes the transformation as an array ([{ quality }, ...transformation]).
 * The player turns each array item into its own URL step, which leaves an `aspectRatio` alone in
 * a step and breaks poster URLs (cloudinary/cloudinary-video-player#1087). When an aspectRatio is
 * set without a cropMode and the array holds nothing but that quality step, return it as a single
 * object so the player adds the aspectRatio to the same step. With a cropMode, the player already
 * puts the crop in the aspectRatio step. Anything else is passed through unchanged, as in 7.0.0,
 * because merging changes what a resize, crop or overlay in the same step does.
 */

export function getPlayerTransformation(
  props: Pick<CldVideoPlayerProps, 'aspectRatio'> & { cropMode?: string },
  transformation: CloudinaryVideoPlayerOptions['transformation']
): CloudinaryVideoPlayerOptions['transformation'] {
  if ( props.aspectRatio && !props.cropMode && Array.isArray(transformation) && isQualityOnly(transformation) ) {
    return Object.assign({}, ...transformation.filter(Boolean));
  }

  return transformation;
}

function isQualityOnly([first, ...rest]: Array<object | undefined | null>) {
  return Object.keys(first || {}).every((key) => key === 'quality') && rest.every(isEmpty);
}

function isEmpty(transformation: object | undefined | null) {
  return !transformation || Object.keys(transformation).length === 0;
}
