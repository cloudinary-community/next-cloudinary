export interface CloudinaryVideoPlayer {
  on: Function
}

export interface CloudinaryVideoPlayerOptions {
  autoplayMode?: string;
  cloud_name?: string;
  colors?: CloudinaryVideoPlayerOptionsColors;
  controls?: boolean;
  fontFace?: string;
  loop?: boolean;
  muted?: boolean;
  publicId: string;
  secure?: boolean;
  transformation?: Array<object> | object;
  showLogo?: boolean;
  sourceTypes?: Array<string>;
  logoImageUrl?: string;
  logoOnclickUrl?: string;
  aiHighlightsGraph?: boolean;
  bigPlayButton?: boolean | string;
  controlBar?: {
    pictureInPictureToggle?: boolean;
    chaptersButton?: boolean;
  };
  floatingWhenNotVisible?: string;
  fluid?: boolean;
  hideContextMenu?: boolean;
  interactionAreas?: any; // Used "any" cause this fetaure is still in beta
  playbackRates?: Array<any>;
  playlistWidget?: {
    direction?: string;
    total?: string
  };
  posterOptions?: object;
  showJumpControls?: boolean;
  seekThumbnails?: boolean;
  videoJS?: object;
  autoShowRecommendations?: boolean;
  maxTries?: Number;
  playedEventPercents?: number[];
  playedEventTimes?: null | Array<any>;
  playsinline?: boolean;
  videoTimeout?: number;
  withCredentials?: boolean;
  chapters?: object;
  preload?: string;
  sourceTransformation?: object;
  ads?: {
    adTagUrl?: string;
    adsInPlaylist?: string;
    showCountdown?: boolean;
    adLabel?: string;
    locale?: string;
    prerollTimeout?: number;
    postrollTimeout?: number;
  };
  analytics?: boolean;
  allowUsageReport?: Boolean;
}

export interface CloudinaryVideoPlayerOptionsColors {
  accent?: string;
  base?: string;
  text?: string;
}

export interface CloudinaryVideoPlayerOptionsLogo {
  logoImageUrl?: string;
  logoOnclickUrl?: string;
  showLogo?: boolean;
}