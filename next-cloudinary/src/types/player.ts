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
  // showLogo?: boolean; // Comment This Out cause it seems to be a duplicate of "CldVideoPlayerPropsLogo"
  // logoImageUrl?: string; // Comment This Out cause it seems to be a duplicate of "CldVideoPlayerPropsLogo"
  // logoOnclickUrl?: string; // Comment This Out cause it seems to be a duplicate of "CldVideoPlayerPropsLogo"
  seekThumbnails?: boolean;
  videoJS?: object;

  // ------------ Player Behavior Props ------------
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

  // Un-Grouped Props 
  cloud_name?: string;
  secure?: boolean;


}

export interface CloudinaryVideoPlayerOptionsColors {
  accent?: string;
  base?: string;
  text?: string;
}


export interface CloudinaryVideoPlayerOptionPosterOptions {
  publicId: string;
}