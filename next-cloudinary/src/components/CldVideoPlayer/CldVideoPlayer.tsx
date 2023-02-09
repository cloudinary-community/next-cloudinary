import { RefObject, useRef } from 'react';
import Script from 'next/script';
import Head from 'next/head';

const DEFAULT_PLAYER_VERSION = '1.9.4';

const CldVideoPlayer = ({ id, src, autoPlay, version = DEFAULT_PLAYER_VERSION, ...props }) => {
  const cloudinaryRef = useRef<any>();
  const videoRef = useRef<HTMLVideoElement>();
  const playerRef = useRef<any>();

  const playerId = id || `player-${src.replace('/', '-')}`;

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    if ( 'cloudinary' in window ) {
      cloudinaryRef.current = window.cloudinary;

      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        secure: true
      });
    }
  }

  return (
    <>
      <Head>
        <link href={`https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.min.css`} rel="stylesheet" />
      </Head>
      <div style={{ width: '100%', aspectRatio: `${props.width} / ${props.height}`}}>
        <video
          ref={videoRef as RefObject<HTMLVideoElement>}
          id={playerId}
          className="cld-video-player cld-fluid"
          data-cld-autoplay-mode={autoPlay}
          data-cld-public-id={src}
          controls
          {...props}
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