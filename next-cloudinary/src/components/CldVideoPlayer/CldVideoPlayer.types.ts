import { MutableRefObject } from 'react';

import { CloudinaryVideoPlayer } from '../../types/player';

export interface CldVideoPlayerProps {
  autoPlay?: string;
  colors?: CldVideoPlayerPropsColors;
  controls?: boolean;
  fontFace?: string;
  height: string | number;
  id?: string;
  logo?: boolean | CldVideoPlayerPropsLogo;
  loop?: boolean;
  muted?: boolean;
  onDataLoad?: Function;
  onError?: Function;
  onMetadataLoad?: Function;
  onPause?: Function;
  onPlay?: Function;
  onEnded?: Function;
  playerRef?: MutableRefObject<CloudinaryVideoPlayer | null>;
  src: string;
  version?: string;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  width: string | number;
}

export interface CldVideoPlayerPropsColors {
  accent?: string;
  base?: string;
  text?: string;
}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: string;
  onClickUrl?: string;
}