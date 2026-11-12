import type { CloudinaryVideoPlayerOptions } from '@cloudinary-util/types';

import type { CldVideoPlayerProps } from './CldVideoPlayer.types';

/**
 * getPlayerTransformation
 * @description getVideoPlayerOptions passes the transformation as an array ([{ quality }, ...transformation]).
 * The player turns each array item into its own URL step, which leaves an `aspectRatio` alone in
 * a step and breaks poster URLs (cloudinary/cloudinary-video-player#1087). When an aspectRatio is
 * set and the caller didn't pass an array themselves, combine everything into a single
 * transformation object. Players without an aspectRatio keep their existing URLs.
 */

export function getPlayerTransformation(
  props: Pick<CldVideoPlayerProps, 'aspectRatio' | 'transformation'>,
  transformation: CloudinaryVideoPlayerOptions['transformation']
): CloudinaryVideoPlayerOptions['transformation'] {
  if ( props.aspectRatio && !Array.isArray(props.transformation) && Array.isArray(transformation) ) {
    return Object.assign({}, ...transformation.filter(Boolean));
  }

  return transformation;
}
