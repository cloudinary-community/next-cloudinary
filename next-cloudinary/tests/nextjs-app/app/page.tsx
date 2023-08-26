"use client";

import { CldImage, CldUploadWidget, CldVideoPlayer } from '../../../';

import '../../../dist/cld-video-player.min.css';

export default function Home() {
  return (
    <>
      <CldImage src="images/woman-headphones" width="100" height="100" alt="test" />
      <CldUploadWidget
        uploadPreset="test-preset"
        options={{
          sources: ['local', 'camera']
        }}
      />
      <CldVideoPlayer
        id="test"
        width="1620"
        height="1080"
        src={`videos/mountain-stars`}
      />
    </>
  )
}
