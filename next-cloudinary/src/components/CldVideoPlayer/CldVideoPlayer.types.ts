import { MutableRefObject } from 'react';
import {
  CloudinaryVideoPlayer,
  CloudinaryVideoPlayerOptionsLogo,
  CloudinaryVideoPlayerOptions
} from '@cloudinary-util/types';

import { GetCldImageUrlOptions } from '../../helpers/getCldImageUrl';
import { GetCldVideoUrlOptions } from '../../helpers/getCldVideoUrl';

export type CldVideoPlayerProps = Omit<CloudinaryVideoPlayerOptions, "cloud_name" | "autoplayMode" | "publicId" | "secure" | "showLogo" | "logoImageUrl" | "logoOnclickUrl"> & {
  className?: string;
  height: string | number;
  id?: string;
  loading?: 'eager' | 'idle' | 'lazy' | 'click';
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

export interface CldVideoPlayerPropsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo['logoImageUrl'];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo['logoOnclickUrl'];
}