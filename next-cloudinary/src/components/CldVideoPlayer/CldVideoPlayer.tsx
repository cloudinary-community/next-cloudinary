import { RefObject, useRef } from 'react';
import Script from 'next/script';
import Head from 'next/head';

interface CldVideoPlayerPropsColors {
  accent?: string;
  base?: string;
  text?: string;
}

interface CldVideoPlayerPropsLogo {
  imageUrl?: string;
  onClickUrl?: string;
}

interface CldVideoPlayerProps {
  autoPlay?: string;
  colors?: CldVideoPlayerPropsColors;
  controls?: boolean;
  fontFace?: string;
  height: string | number;
  id?: string;
  logo?: boolean | CldVideoPlayerPropsLogo;
  loop?: boolean;
  muted?: boolean;
  src: string;
  version?: string;
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
    src,
    version = '1.9.4',
    width,
  } = props as CldVideoPlayerProps;

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