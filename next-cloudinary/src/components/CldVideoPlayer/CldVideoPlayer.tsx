import React, { useRef, MutableRefObject, useEffect} from 'react';
import Script, { ScriptProps } from 'next/script';
import Head from 'next/head';
import { parseUrl } from '@cloudinary-util/util';
import { CloudinaryVideoPlayer, CloudinaryVideoPlayerOptionsLogo, CloudinaryVideoPlayerOptions, } from '@cloudinary-util/types';

import { CldVideoPlayerProps } from './CldVideoPlayer.types';

import { getCldImageUrl } from '../../helpers/getCldImageUrl';
import { getCldVideoUrl } from '../../helpers/getCldVideoUrl';
import {checkForCloudName} from "../../lib/cloudinary";

let playerInstances: string[] = [];

const PLAYER_VERSION = '1.10.6';

const CldVideoPlayer = (props: CldVideoPlayerProps) => {
  const {
    autoplay,
    className,
    colors,
    controls = true,
    fontFace,
    height,
    id,
    language,
    languages,
    loading = 'lazy',
    logo = true,
    loop = false,
    muted = false,
    onDataLoad,
    onError,
    onMetadataLoad,
    onPause,
    onPlay,
    onEnded,
    poster,
    src,
    sourceTypes,
    transformation,
    quality = 'auto',
    width,
    ...otherCldVidPlayerOptions
  } = props as CldVideoPlayerProps;

  const shouldInitializeRef = useRef(false);
  const playerTransformations = Array.isArray(transformation) ? transformation : [transformation];
  let publicId: string = src || "";

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


  // Map callback handlers based on names for the player options

  const events: Record<string, Function|undefined> = {
    error: onError,
    loadeddata: onDataLoad,
    loadedmetadata: onMetadataLoad,
    pause: onPause,
    play: onPlay,
    ended: onEnded
  };

  // Collect player configuration

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

  // Parse the value passed to 'autoplay';
  // if its a boolean or a boolean passed as string ("true") set it directly to browser standard prop autoplay else fallback to default;
  // if its a string and not a boolean passed as string ("true") set it to cloudinary video player autoplayMode prop else fallback to undefined;

  let autoPlayValue: boolean | 'true' | 'false' = false;
  let autoplayModeValue: string | undefined = undefined;

  if (typeof autoplay === 'boolean' || autoplay === 'true' || autoplay === 'false') {
    autoPlayValue = autoplay
  }

  if (typeof autoplay === 'string' && autoplay !== 'true' && autoplay !== 'false') {
    autoplayModeValue = autoplay;
  }

  let playerOptions: CloudinaryVideoPlayerOptions = {
    autoplayMode: autoplayModeValue,
    autoplay: autoPlayValue,
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    controls,
    fontFace: fontFace || '',
    language,
    languages,
    loop,
    muted,
    publicId,
    transformation: playerTransformations,
    ...logoOptions,
    ...otherCldVidPlayerOptions
  };

  if ( Array.isArray(sourceTypes) ) {
    playerOptions.sourceTypes = sourceTypes;
  }

  if ( typeof colors === 'object' ) {
    playerOptions.colors = colors;
  }

  if ( typeof poster === 'string' ) {
    // If poster is a string, assume it's either a public ID
    // or a remote URL, in either case pass to `publicId`
    playerOptions.posterOptions = {
      publicId: poster
    };
  } else if ( typeof poster === 'object' ) {
    // If poster is an object, we can either customize the
    // automatically generated image from the video or generate
    // a completely new image from a separate public ID, so look
    // to see if the src is explicitly set to determine whether
    // or not to use the video's ID or just pass things along
    if ( typeof poster.src !== 'string' ) {
      playerOptions.posterOptions = {
        publicId: getCldVideoUrl({
          ...poster,
          src: publicId,
          format: 'auto:image',
        })
      };
    } else {
      playerOptions.posterOptions = {
        publicId: getCldImageUrl(poster)
      };
    }
  }

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

  //Check if Cloud Name exists
  checkForCloudName(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  // Determine what value to use when loading the player script via Next Script
  // Really the only time we'll be setting a value here is if we're using idle
  // in which we'll use the Script tag's method instead of trying to run our own

  let scriptStrategy: ScriptProps['strategy'] | undefined = undefined;

  // We're choosing a different definition of lazyloading here, where lazy loading
  // will work more similarly to how images and iframes work, where we'll initialize
  // the player closer to when it comes into view, so if we're defining loading
  // as idle, we'll use lazyOnload which is on idle

  if ( ['idle', 'lazy'].includes(loading) ) {
    scriptStrategy = 'lazyOnload';
  }

  useEffect(() => {
    if ( !videoRef.current || loading !== 'lazy' ) return;

    const video = videoRef.current as Element;

    const observer = new IntersectionObserver((entries, observer) => {
      if ( entries[0].isIntersecting ) {        
        shouldInitializeRef.current = true;

        if ( cloudinaryRef.current ) {
          initializePlayer();
        }

        observer.unobserve(video);
      }
    });
    
    observer.observe(video);

    return () => {
      observer.unobserve(video);
    }
  }, [videoRef.current, loading]);

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    if ( 'cloudinary' in window ) {
      cloudinaryRef.current = window.cloudinary;
      
      if ( loading === 'eager' || ( loading === 'lazy' && shouldInitializeRef.current) ) {
        initializePlayer();
      } else if ( loading === 'idle' ) {
        if ( 'requestIdleCallback' in window ) {
          requestIdleCallback(() => initializePlayer());
        } else {
          setTimeout(() => initializePlayer(), 1);
        }
      }

      shouldInitializeRef.current = true;
    }
  }

  /**
   * initializePlayer
   * @description Creates new player instance and sets player events
   */

  function initializePlayer() {
    if ( !cloudinaryRef.current ) return;

    playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, playerOptions);

    Object.keys(events).forEach((key) => {
      if ( typeof events[key] === 'function' ) {
        playerRef.current?.on(key, handleEvent);
      }
    });
  }

  useEffect(() => {
    return () => {
      //@ts-ignore
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
      <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
        <video
          ref={videoRef}
          id={playerId}
          className={playerClassName}
          width={width}
          height={height}
        />
        <Script
          strategy={scriptStrategy}
          id={`cloudinary-videoplayer-${playerId}-${Math.floor(Math.random() * 100)}`}
          src={`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.js`}
          onLoad={handleOnLoad}
          onError={(e) => console.error(`Failed to load Cloudinary Video Player: ${e.message}`)}
        />
      </div>
    </>
  );
};

export default CldVideoPlayer;
