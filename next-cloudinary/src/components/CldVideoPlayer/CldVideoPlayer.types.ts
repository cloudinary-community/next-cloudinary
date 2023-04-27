import { MutableRefObject } from 'react';

import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptions, CloudinaryVideoPlayerOptionsColors, CloudinaryVideoPlayerOptionsLogo } from '../../types/player';

export type CldVideoPlayerProps = Pick<CloudinaryVideoPlayerOptions, "colors" | "controls" | "fontFace" | "loop" | "muted"> & {
  autoPlay?: string;
  className?: string;
  height: string | number;
  id?: string;
  logo?: boolean | CldVideoPlayerPropsLogo;
  onDataLoad?: Function;
  onError?: Function;
  onMetadataLoad?: Function;
  onPause?: Function;
  onPlay?: Function;
  onEnded?: Function;
  playerRef?: MutableRefObject<CloudinaryVideoPlayer | null>;
  src: string;
  transformation: string;
  version?: string;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  width: string | number;
}

// Maintain for backwards compatibility

export interface CldVideoPlayerPropsColors extends CloudinaryVideoPlayerOptionsColors {}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo['logoImageUrl'];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo['logoOnclickUrl'];
}