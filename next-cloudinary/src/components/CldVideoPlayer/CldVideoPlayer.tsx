import React, { useRef, MutableRefObject } from 'react';
import Script from 'next/script';
import Head from 'next/head';

export interface CldVideoPlayerPropsColors {
  accent?: string;
  base?: string;
  text?: string;
}

export interface CldVideoPlayerPropsLogo {
  imageUrl?: string;
  onClickUrl?: string;
}

export interface CldVideoPlayerPlayer {
  on: Function
}

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
  playerRef?: MutableRefObject<CldVideoPlayerPlayer | null>;
  src: string;
  version?: string;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
  width: string | number;
}

const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  const {
    autoPlay = 'never',
    colors,
    controls = true,
    fontFace,
    height,
    id,
    logo = true,
    loop = false,
    muted = false,
    onDataLoad,
    onError,
    onMetadataLoad,
    onPause,
    onPlay,
    onEnded,
    src,
    version = '1.9.4',
    width,
  } = props as CldVideoPlayerProps;

  // Setup the refs and allow for the caller to pass through their
  // own ref instance

  const cloudinaryRef = useRef<any>();
  const defaultVideoRef = useRef() as MutableRefObject<HTMLVideoElement | null>;
  const videoRef = props.videoRef || defaultVideoRef;
  const defaultPlayerRef = useRef()as MutableRefObject<CldVideoPlayerPlayer | null>;
  const playerRef = props.playerRef || defaultPlayerRef;

  const playerId = id || `player-${src.replace('/', '-')}`;

  const events: Record<string, Function|undefined> = {
    error: onError,
    loadeddata: onDataLoad,
    loadedmetadata: onMetadataLoad,
    pause: onPause,
    play: onPlay,
    ended: onEnded
  };

  /**
   * handleEvent
   * @description Event handler for all player events
   */

  function handleEvent(event: { type: 'string' }) {
    const activeEvent = events[event.type];

    if ( typeof activeEvent === 'function' ) {
      activeEvent(getPlayerRefs());
    }
  }

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    if ( 'cloudinary' in window ) {
      cloudinaryRef.current = window.cloudinary;

      interface LogoOptions {
        logoImageUrl?: string;
        logoOnclickUrl?: string;
        showLogo?: boolean;
      }

      let logoOptions: LogoOptions = {};

      if ( typeof logo === 'boolean' ) {
        logoOptions.showLogo = logo;
      } else if ( typeof logo === 'object' ) {
        logoOptions = {
          ...logoOptions,
          showLogo: true,
          logoImageUrl: logo.imageUrl,
          logoOnclickUrl: logo.onClickUrl
        }
      }

      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
        autoplayMode: autoPlay,
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        color: colors,
        controls,
        fontFace: fontFace || '',
        loop,
        muted,
        publicId: src,
        secure: true,
        ...logoOptions
      });

      Object.keys(events).forEach((key) => {
        if ( typeof events[key] === 'function' ) {
          playerRef.current?.on(key, handleEvent);
        }
      });
    }
  }

  /**
   *
   */

  function getPlayerRefs() {
    return {
      player: playerRef.current,
      video: videoRef.current
    }
  }

  return (
    <>
      <Head>
        <link href={`https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.css`} rel="stylesheet" />
      </Head>
      <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
        <video
          ref={videoRef}
          id={playerId}
          className="cld-video-player cld-fluid"
          width={width}
          height={height}
        />
        <Script
          id={`cloudinary-videoplayer-${Math.floor(Math.random() * 100)}`}
          src={`https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.js`}
          onLoad={handleOnLoad}
          onError={(e) => console.error(`Failed to load Cloudinary Video Player: ${e.message}`)}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;