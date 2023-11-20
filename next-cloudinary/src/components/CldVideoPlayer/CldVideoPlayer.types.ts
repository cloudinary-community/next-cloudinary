import { MutableRefObject } from 'react';

import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptions, CloudinaryVideoPlayerOptionsColors, CloudinaryVideoPlayerOptionsLogo } from '../../types/player';
import { GetCldImageUrlOptions } from '../../helpers/getCldImageUrl';
import { GetCldVideoUrlOptions } from '../../helpers/getCldVideoUrl';

export type CldVideoPlayerProps = Omit<CloudinaryVideoPlayerOptions, "cloud_name" | "autoplayMode" | "publicId" | "secure" | "showLogo" | "logoImageUrl" | "logoOnclickUrl"> & {
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
  poster?: string | GetCldImageUrlOptions | GetCldVideoUrlOptions;
  src: string;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  quality?: string | number;
  width: string | number;
}

// Maintain for backwards compatibility

export interface CldVideoPlayerPropsColors extends CloudinaryVideoPlayerOptionsColors {}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo['logoImageUrl'];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo['logoOnclickUrl'];
}