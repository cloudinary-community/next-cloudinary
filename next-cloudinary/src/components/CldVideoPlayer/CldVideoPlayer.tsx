'use client';
import {useRef, useEffect, useId, useState} from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { CloudinaryVideoPlayer } from '@cloudinary-util/types';
import { getVideoPlayerOptions } from '@cloudinary-util/url-loader';

import { CldVideoPlayerProps } from './CldVideoPlayer.types';

import { getCloudinaryConfig } from "../../lib/cloudinary";

let playerInstances: string[] = [];

const PLAYER_VERSION = '4.1.2';

const CldVideoPlayer = (props: CldVideoPlayerProps) => {

  const {
    className,
    config,
    disableRemotePlayback,
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

  const cloudinaryRef = useRef<any>(undefined);
  const defaultVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = props.videoRef || defaultVideoRef;
  const defaultPlayerRef = useRef<CloudinaryVideoPlayer | null>(null);
  const playerRef = props.playerRef || defaultPlayerRef;
  // The <video> element the player was created on (video.js keeps using it inside the player)
  const playerVideoElementRef = useRef<HTMLVideoElement | null>(null);

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
    // React Strict Mode runs effect cleanups without removing the DOM, then reuses the same
    // <video> element. Keep the player in that case; dispose() would remove the element.
    if (playerVideoElementRef.current?.isConnected) return;

    // dispose() on the player instance also removes it from the video.js registry,
    // so a remount with the same id creates a new player instead of reusing a stale one
    if (typeof playerRef.current?.dispose === 'function') {
      playerRef.current.dispose();
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
    // Check the ref, not the playerInitialized state: onLoad and onReady can both call this
    // during the same render, and the state value seen there may be stale
    if (typeof window !== 'undefined' && 'cloudinary' in window && videoRef.current && !playerRef.current) {
      cloudinaryRef.current = window.cloudinary;

      playerVideoElementRef.current = videoRef.current;
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
          disableRemotePlayback={disableRemotePlayback}
        />
        <Script
          id={`cloudinary-videoplayer-${playerId}`}
          src={`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.js`}
          onLoad={handleOnLoad}
          // onReady also runs on later mounts with the same script id, where onLoad doesn't fire again
          onReady={handleOnLoad}
          onError={(e) => console.error(`Failed to load Cloudinary Video Player: ${e.message}`)}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;
