import { MutableRefObject } from 'react';
import {
  CloudinaryVideoPlayer,
  CloudinaryVideoPlayerOptionsLogo,
} from '@cloudinary-util/types';
import { ConfigOptions, GetVideoPlayerOptions } from "@cloudinary-util/url-loader";

import { GetCldImageUrlOptions } from '../../helpers/getCldImageUrl';
import { GetCldVideoUrlOptions } from '../../helpers/getCldVideoUrl';

export type CldVideoPlayerProps = Omit<GetVideoPlayerOptions, "cloud_name" | "autoplayMode" | "publicId" | "secure" | "showLogo" | "logoImageUrl" | "logoOnclickUrl"> & {
  className?: string;
  config?: ConfigOptions;
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
}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: CloudinaryVideoPlayerOptionsLogo['logoImageUrl'];
  logo?: boolean;
  onClickUrl?: CloudinaryVideoPlayerOptionsLogo['logoOnclickUrl'];
}
