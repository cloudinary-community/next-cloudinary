"use client";

import { CldImage, CldUploadWidget } from '../../../';

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
    </>
  )
}
