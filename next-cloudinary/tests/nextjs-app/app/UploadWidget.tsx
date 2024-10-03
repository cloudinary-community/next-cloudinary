"use client";

import { CldUploadWidget } from "../../..";

export function UploadWidget() {
  return (
    <CldUploadWidget
      uploadPreset="next-cloudinary-unsigned"
      options={{
        sources: ["local", "camera"],
      }}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload</button>;
      }}
    </CldUploadWidget>
  );
}
