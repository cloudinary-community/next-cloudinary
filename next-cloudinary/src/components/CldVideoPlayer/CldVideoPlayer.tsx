import React, {useRef, MutableRefObject, useEffect, useId} from 'react';
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
      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, playerOptions);

      Object.keys(events).forEach((key) => {
        if ( typeof events[key] === 'function' ) {
          playerRef.current?.on(key, handleEvent);
        }
      });
    }
  }

  useEffect(() => {

    return () => {
      playerRef.current?.videojs.cloudinary.dispose();
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
        <link href={`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`} rel="stylesheet" />
      </Head>
      <div style={{ width: '100%', aspectRatio: `${width} / ${height}`}}>
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
