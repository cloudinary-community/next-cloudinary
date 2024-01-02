"use client";

import { CldImage, CldUploadWidget, CldUploadButton } from '../../../dist/index.mjs';

import '../../../dist/cld-video-player.css';

export default function Home() {
  return (
    <>
      <div style={{
        marginBottom: '2em'
      }}>
        <h2>CldImage</h2>
        <CldImage src="images/woman-headphones" width="100" height="100" alt="test" />
      </div>
      <div style={{
        marginBottom: '2em'
      }}>
        <h2>CldUploadWidget</h2>
        <CldUploadWidget
          uploadPreset="next-cloudinary-unsigned"
          options={{
            sources: ['local', 'camera']
          }}
        >
          {({ open }) => {
            return (
              <button onClick={() => open()}>Upload</button>
            )
          }}
        </CldUploadWidget>
      </div>
      <div style={{
        marginBottom: '2em'
      }}>
        <h2>CldUploadButton</h2>
        <CldUploadButton uploadPreset="next-cloudinary-unsigned" />
      </div>
      <div style={{
        marginBottom: '2em'
      }}>
        <h2>CldVideoPlayer</h2>
        {/* <CldVideoPlayer
          id="test"
          width="1620"
          height="1080"
          src={`videos/mountain-stars`}
        /> */}
      </div>
    </>
  )
}
