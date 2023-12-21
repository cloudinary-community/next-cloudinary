export interface CloudinaryVideoPlayer {
  on: Function
}

export interface CloudinaryVideoPlayerOptionsLogo {
  logoImageUrl?: string;
  logoOnclickUrl?: string;
  showLogo?: boolean;
}
export interface CloudinaryVideoPlayerOptions extends CloudinaryVideoPlayerOptionsLogo {
  // ------------ Player visuals Props ------------
  aiHighlightsGraph?: boolean;
  bigPlayButton?: boolean | string;
  colors?: CloudinaryVideoPlayerOptionsColors;
  controlBar?: {
    pictureInPictureToggle?: boolean;
    chaptersButton?: boolean;
  };
  controls?: boolean;
  floatingWhenNotVisible?: string;
  fluid?: boolean;
  fontFace?: string;
  hideContextMenu?: boolean;
  interactionAreas?: any; // Used "any" cause this fetaure is still in beta
  playbackRates?: Array<any>;
  playlistWidget?: {
    direction?: string;
    total?: string
  };
  posterOptions?: CloudinaryVideoPlayerOptionPosterOptions;
  showJumpControls?: boolean;
  seekThumbnails?: boolean;
  videoJS?: object;

  // ------------ Player Behavior Props ------------
  autoPlay?: string | boolean | undefined; // Left behind for backward compactibility.
  autoplay?: string | boolean | undefined;
  autoplayMode?: string;
  autoShowRecommendations?: boolean;
  loop?: boolean;
  maxTries?: Number;
  muted?: boolean;
  playedEventPercents?: number[];
  playedEventTimes?: null | Array<any>;
  playsinline?: boolean;
  videoTimeout?: number;
  withCredentials?: boolean;

  // ------------ Video Config Props ------------
  chapters?: object;
  preload?: string;
  publicId?: string;  
  sourceTransformation?: object;
  sourceTypes?: Array<string>;
  transformation?: Array<object> | object;

 // ------------ Ads And Analytics Props ------------
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

  // ------------ Delivery ------------
  cloud_name?: string;
  cname?: string;
  privateCdn?: boolean;
  queryParams?: Record<string, string | number | boolean> | string;
  secure?: boolean;
  secureDistribution?: string;

  // Misc

  language?: string;
  languages?: Record<string, object>;
}

export interface CloudinaryVideoPlayerOptionsColors {
  accent?: string;
  base?: string;
  text?: string;
}


export interface CloudinaryVideoPlayerOptionPosterOptions {
  publicId: string;
}