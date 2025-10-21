import React, {useRef, MutableRefObject, useEffect, useId, useState} from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { CloudinaryVideoPlayer } from '@cloudinary-util/types';
import { getVideoPlayerOptions } from '@cloudinary-util/url-loader';

import { CldVideoPlayerProps } from './CldVideoPlayer.types';

import { getCloudinaryConfig } from "../../lib/cloudinary";

let playerInstances: string[] = [];

const PLAYER_VERSION = '1.11.1';

const CldVideoPlayer = (props: CldVideoPlayerProps) => {

  const {
    className,
    config,
    height,
    id,
    onDataLoad,
    onError,
    onMetadataLoad,
    onPause,
    onPlay,
    onEnded,
    width,
  } = props;

  const uniqueId = useId();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const cloudinaryConfig = getCloudinaryConfig(config);
  const playerOptions = getVideoPlayerOptions(props, cloudinaryConfig);
  const { publicId } = playerOptions;
  if ( typeof publicId === 'undefined' ) {
    throw new Error('Video Player requires a Public ID or Cloudinary URL - please specify a src prop');
  }

  // Setup the refs and allow for the caller to pass through their
  // own ref instance

  const cloudinaryRef = useRef<any>();
  const defaultVideoRef = useRef() as MutableRefObject<HTMLVideoElement | null>;
  const videoRef = props.videoRef || defaultVideoRef;
  const defaultPlayerRef = useRef()as MutableRefObject<CloudinaryVideoPlayer | null>;
  const playerRef = props.playerRef || defaultPlayerRef;

  const playerId = id || `player-${uniqueId.replace(/:/g, '')}`;
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
   * disposePlayer
   * @description Properly dispose of the player instance and clean up
   */

  const disposePlayer = () => {
    if (playerRef.current?.videojs?.cloudinary) {
      playerRef.current.videojs.cloudinary.dispose();
    }
    // remove from global instances array
    playerInstances = playerInstances.filter((instanceId) => instanceId !== playerId);
    playerRef.current = null;
    setPlayerInitialized(false);
  };

  /**
   * initializePlayer
   * @description Initialize the Cloudinary video player
   */

  const initializePlayer = () => {
    if (typeof window !== 'undefined' && 'cloudinary' in window && videoRef.current && !playerInitialized) {
      cloudinaryRef.current = window.cloudinary;
      
      // dispose any existing player instance first to prevent conflicts
      if (playerRef.current) {
        disposePlayer();
      }
      
      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, playerOptions);
      setPlayerInitialized(true);

      Object.keys(events).forEach((key) => {
        if ( typeof events[key] === 'function' ) {
          playerRef.current?.on(key, handleEvent);
        }
      });
    }
  };

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    setIsScriptLoaded(true);
    if ( 'cloudinary' in window ) {
      initializePlayer();
    }
  }

  // effect to handle component mounting and cleanup
  useEffect(() => {
    // initialize player if script is already loaded
    if (isScriptLoaded && typeof window !== 'undefined' && 'cloudinary' in window) {
      initializePlayer();
    }

    return () => {
      disposePlayer();
    };
  }, []);

  // effect to handle script loading after mount
  useEffect(() => {
    if (isScriptLoaded && !playerInitialized && typeof window !== 'undefined' && 'cloudinary' in window) {
      initializePlayer();
    }
  }, [isScriptLoaded, playerInitialized]);

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
        <link href={`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`} rel="stylesheet" />
      </Head>
      <div style={{ width: '100%' }}>
        <video
          ref={videoRef}
          id={playerId}
          className={playerClassName}
          width={width}
          height={height}
        />
        <Script
          id={`cloudinary-videoplayer-${playerId}`}
          src={`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.js`}
          onLoad={handleOnLoad}
          onError={(e) => console.error(`Failed to load Cloudinary Video Player: ${e.message}`)}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;
