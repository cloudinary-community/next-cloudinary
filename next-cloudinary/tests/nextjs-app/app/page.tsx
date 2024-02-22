"use client";

import { CldImage, CldUploadWidget, CldUploadButton, CldVideoPlayer } from '../../../';
import { getCldImageUrl, getCldOgImageUrl, getCldVideoUrl } from '../../../dist/helpers';

import '../../../dist/cld-video-player.css';

export default function Home() {
  console.log(getCldImageUrl({
    src: 'images/turtle'
  }))
  console.log(getCldOgImageUrl({
    src: 'images/turtle'
  }))
  console.log(getCldVideoUrl({
    src: 'videos/mountain-stars'
  }))
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
        <CldVideoPlayer
          id="test"
          width="1620"
          height="1080"
          src={`videos/mountain-stars`}
        />
      </div>
    </>
  )
}
