import React, {useRef, MutableRefObject, useEffect} from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { parseUrl } from '@cloudinary-util/util';

import { CldVideoPlayerProps } from './CldVideoPlayer.types';
import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptions, CloudinaryVideoPlayerOptionsLogo } from '../../types/player';

let playerInstances: string[] = [];

const CldVideoPlayer = (props: CldVideoPlayerProps) => {

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
    sourceTypes,
    transformation,
    version = '1.9.16',
    quality = 'auto',
    width,
  } = props as CldVideoPlayerProps;

  const playerTransformations = Array.isArray(transformation) ? transformation : [transformation];
  let publicId: string = src || "";

  if ( typeof props.version === 'string' ) {
    console.warn('The version prop will no longer be supported in future versions due to the unreliability of coordinating assets');
  }

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

  const playerId = id || `player-${publicId.replace('/', '-')}`;
  let playerClassName = 'cld-video-player cld-fluid';

  if ( className ) {
    playerClassName = `${playerClassName} ${className}`;
  }

  // Check if the same id is being used for multiple video instances.
  const checkForMultipleInstance = playerInstances.filter((id) => id === playerId).length > 1
  if (checkForMultipleInstance) {
    console.warn(`Multiple instances of the same video detected on the
     page which may cause some features to not work. 
    Try adding a unique id to each player.`)
  } else {
    playerInstances.push(playerId)
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

      if ( Array.isArray(sourceTypes) ) {
        playerOptions.sourceTypes = sourceTypes;
      }

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

  useEffect(() => {
    handleOnLoad();

    return () => {
      defaultVideoRef.current = null;
      defaultPlayerRef.current = null;
      playerInstances = playerInstances.filter((id) => id !== playerId)
    }
  }, []);

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
          id={`cloudinary-videoplayer-${playerId}`}
          src={`https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.js`}
          onLoad={handleOnLoad}
          onError={(e) => console.error(`Failed to load Cloudinary Video Player: ${e.message}`)}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;