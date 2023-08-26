import React, { useRef, useEffect, useState, MutableRefObject,  } from 'react';
import { parseUrl } from '@cloudinary-util/util';
import Head from 'next/head';
import pkg from '../../../package.json'

import { CldVideoPlayerProps } from './CldVideoPlayer.types';
import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptions, CloudinaryVideoPlayerOptionsLogo } from '../../types/player';

// @ts-ignore
const version: string = pkg.dependencies['cloudinary-video-player'];

const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  const {
    autoPlay = 'never',
    className,
    colors,
    controls = true,
    excludeExternalStylesheet = false,
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
    quality = 'auto',
    width,
  } = props as CldVideoPlayerProps;

  if ( typeof props.version !== 'undefined' ) {
    console.warn('The version prop no longer controls the video player version and thus is no longer available for use.');
  }

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

  const defaultVideoRef = useRef() as MutableRefObject<HTMLVideoElement | null>;
  const videoRef = props.videoRef || defaultVideoRef;
  const defaultPlayerRef = useRef()as MutableRefObject<CloudinaryVideoPlayer | null>;
  const playerRef = props.playerRef || defaultPlayerRef;

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
    publicId: src,
    secure: true,
    transformation: playerTransformations,
    ...logoOptions
  };

  if ( typeof colors === 'object' ) {
    playerOptions.colors = colors;
  }

  // If no ID is passed in - we want to be able to ensure that we are using
  // unique IDs for each player to avoid conflicts. We can do this by generating
  // a random number and using that as the ID. We use a ref here so that we can
  // ensure that the ID is only generated once.

  const idRef = useRef(Math.ceil(Math.random() * 100000));
  const [playerId, setPlayerId] = useState(id);

  useEffect(() => {
    if ( typeof id !== 'undefined' ) return;
    setPlayerId(`player-${src.replace('/', '-')}-${idRef.current}`);
  }, [])

  // Initialize the player

  useEffect(() => {
    if ( !playerId || playerRef.current ) return;

    (async function run() {
      // @ts-ignore
      const { videoPlayer } = await import('cloudinary-video-player');

      if ( !playerRef.current ) {
        playerRef.current = videoPlayer(videoRef.current, playerOptions);

        Object.keys(events).forEach((key) => {
          if ( typeof events[key] === 'function' ) {
            playerRef.current?.on(key, handleEvent);
          }
        });
      }
    })();

    return () => {
      if ( playerRef.current ) {
        playerRef.current.dispose();
      }
    }
  }, [playerId])

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
      {/**
       * There's not a reliable way (?) to include the stylesheet without impacting the rest
       * of the components and not requirin the developer to include it themselves, so add
       * it to head by default. If using Next.js 13 App, where Head is not supported, they
       * would likely need to still add it themselves
       */}
      {!excludeExternalStylesheet && (
        <Head>
          <link href={`https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.css`} rel="stylesheet" />
        </Head>
      )}
      <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
        <video
          ref={videoRef}
          id={playerId}
          className={playerClassName}
          width={width}
          height={height}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;