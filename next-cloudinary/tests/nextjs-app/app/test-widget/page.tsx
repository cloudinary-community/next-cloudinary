"use client";

import { useState } from 'react';
import { CldUploadWidget } from '../../../../';

export default function TestWidget() {
  const [mounted, setMounted] = useState(true);
  const [mountCount, setMountCount] = useState(1);

  function toggle() {
    setMounted(false);
    setTimeout(() => {
      setMounted(true);
      setMountCount((c) => c + 1);
    }, 300);
  }

  return (
    <div style={{ padding: '2em', fontFamily: 'sans-serif' }}>
      <h1>CldUploadWidget — unmount/remount test</h1>
      <p>
        Click <strong>Remount widget</strong> to unmount and remount the widget.
        After each remount, open the browser DevTools → Elements panel and check
        that there is only <strong>one</strong> Cloudinary Upload Widget iframe
        in the DOM (look for <code>id</code> starting with <code>cloudinary-widget</code>).
      </p>
      <p>Mount count: <strong>{mountCount}</strong></p>

      <div style={{ marginBottom: '1em' }}>
        <button onClick={toggle} style={{ marginRight: '1em' }}>
          Remount widget
        </button>
      </div>

      {mounted && (
        <CldUploadWidget uploadPreset="next-cloudinary-unsigned">
          {({ open }) => (
            <button onClick={() => open()}>
              Open Upload Widget
            </button>
          )}
        </CldUploadWidget>
      )}

      <hr style={{ margin: '2em 0' }} />
      <h2>How to verify</h2>
      <ol>
        <li>Open DevTools → Elements (or Inspector)</li>
        <li>Search for <code>cloudinary-widget</code> in the DOM</li>
        <li>Click <strong>Remount widget</strong> several times</li>
        <li>Confirm there is always exactly one iframe — not one per remount</li>
      </ol>
    </div>
  );
}
