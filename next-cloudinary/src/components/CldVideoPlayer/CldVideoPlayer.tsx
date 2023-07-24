import React, { useRef, MutableRefObject } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { parseUrl } from '@cloudinary-util/util';

import { CldVideoPlayerProps } from './CldVideoPlayer.types';
import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptions, CloudinaryVideoPlayerOptionsLogo } from '../../types/player';

const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  // If no ID is passed in - we want to be able to ensure that we are using
  // unique IDs for each player. We can do this by generating a random number
  // and using that as the ID. We use a ref here so that we can ensure that
  // the ID is only generated once.
  const idRef = useRef(Math.ceil(Math.random() * 100000));

  const {
    autoPlay = 'never',
    className,
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
    transformation,
    version = '1.9.4',
    quality = 'auto',
    width,
  } = props as CldVideoPlayerProps;

  const playerTransformations = Array.isArray(transformation) ? transformation : [transformation];
  let publicId = src;

  // If the publicId/src is a URL, attempt to parse it as a Cloudinary URL
  // to get the public ID alone

  if ( publicId.startsWith('http') ) {
    try {
      const parts = parseUrl(src);
      if ( typeof parts?.publicId === 'string' ) {
        publicId = parts?.publicId;
      }
    } catch(e) {}
  }

  // Set default transformations for the player

  playerTransformations.unshift({
    quality
  });

  // Setup the refs and allow for the caller to pass through their
  // own ref instance

  const cloudinaryRef = useRef<any>();
  const defaultVideoRef = useRef() as MutableRefObject<HTMLVideoElement | null>;
  const videoRef = props.videoRef || defaultVideoRef;
  const defaultPlayerRef = useRef()as MutableRefObject<CloudinaryVideoPlayer | null>;
  const playerRef = props.playerRef || defaultPlayerRef;

  const playerId = id || `player-${publicId.replace('/', '-')}-${idRef.current}`;
  let playerClassName = 'cld-video-player cld-fluid';

  if ( className ) {
    playerClassName = `${playerClassName} ${className}`;
  }

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

      let logoOptions: CloudinaryVideoPlayerOptionsLogo = {};

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

      let playerOptions: CloudinaryVideoPlayerOptions = {
        autoplayMode: autoPlay,
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        controls,
        fontFace: fontFace || '',
        loop,
        muted,
        publicId,
        secure: true,
        transformation: playerTransformations,
        ...logoOptions
      };

      if ( typeof colors === 'object' ) {
        playerOptions.colors = colors;
      }

      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, playerOptions);

      Object.keys(events).forEach((key) => {
        if ( typeof events[key] === 'function' ) {
          playerRef.current?.on(key, handleEvent);
        }
      });
    }
  }

  /**
   *getPlayerRefs
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
          className={playerClassName}
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