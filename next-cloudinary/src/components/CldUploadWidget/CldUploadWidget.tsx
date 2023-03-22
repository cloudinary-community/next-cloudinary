import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

import { triggerOnIdle } from '../../lib/util';

import { CldUploadWidgetProps, CldUploadWidgetResults } from './CldUploadWidget.types';

const WIDGET_WATCHED_EVENTS = [
  'success',
  'display-changed'
];

const CldUploadWidget = ({
  children,
  onClose,
  onError,
  onOpen,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
}: CldUploadWidgetProps) => {
  const cloudinary: any = useRef();
  const widget: any = useRef();

  const signed = !!signatureEndpoint;

  const [error, setError] = useState(undefined);
  const [results, setResults] = useState<CldUploadWidgetResults | undefined>(undefined);

  // Read the results and handle component callbacks based on
  // the the event. The results should only be updated based
  // on the watched event IDs in WIDGET_WATCHED_EVENTS to avoid
  // too many repetitive state changes (consequently skipping some)

  useEffect(() => {
    if ( typeof results === 'undefined' ) return;

    const isSuccess = results.event === 'success';
    const isClosed = results.event === 'display-changed' && results.info === 'hidden';

    if ( isSuccess && typeof onUpload === 'function' ) {
      onUpload(results, widget.current);
    }

    if ( isClosed && typeof onClose === 'function' ) {
      onClose(widget.current);
    }
  }, [results])

  useEffect(() => {
    if ( error && typeof onError === 'function' ) {
      onError(error, widget.current);
    }
  }, [error]);

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    if ( !cloudinary.current ) {
      cloudinary.current = (window as any).cloudinary;
    }

    // To help improve load time of the widget on first instance, use requestIdleCallback
    // to trigger widget creation. Optional.

    triggerOnIdle(() => {
      if ( !widget.current ) {
        widget.current = createWidget();
      }
    });
  }

  /**
   * generateSignature
   * @description Makes a request to an endpoint to sign Cloudinary parameters as part of widget creation
   */

  function generateSignature(callback: Function, paramsToSign: object) {
    if ( typeof signatureEndpoint === 'undefined' ) {
      throw Error('Failed to generate signature: signatureEndpoint undefined.')
    }
    fetch(signatureEndpoint, {
      method: 'POST',
      body: JSON.stringify({
        paramsToSign,
      }),
    })
      .then((r) => r.json())
      .then(({ signature }) => {
        callback(signature);
      });
  }

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    // When creating a signed upload, you need to provide both your Cloudinary API Key
    // as well as a signature generator function that will sign any paramters
    // either on page load or during the upload process. Read more about signed uploads at:
    // https://cloudinary.com/documentation/upload_widget#signed_uploads

    const uploadOptions = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      ...options,
    };

    if ( signed ) {
      uploadOptions.uploadSignature = generateSignature;

      // No need for apiSecret here because of api/sign-cloudinary-params

      if (!uploadOptions.apiKey) {
        return new Error("Signed Upload needs apiKey!");
      }
    }

    return cloudinary.current?.createUploadWidget(uploadOptions, (uploadError: any, uploadResult: any) => {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurrence

      if ( typeof uploadError !== 'undefined' ) {
        setError(uploadError);
      }

      if ( WIDGET_WATCHED_EVENTS.includes(uploadResult?.event) ) {
        setResults(uploadResult);
      }
    });
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    console.log('open')
    console.log('widget.currentbefore', widget.current)
    if (!widget.current) {
      widget.current = createWidget();
    }
    console.log('widget.currentafter', widget.current)

    widget.current?.open();

    if ( typeof onOpen === 'function' ) {
      onOpen(widget.current);
    }
  }

  return (
    <>
      {typeof children === 'function' && children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        open,
        results,
        error
      })}
      <Script
        id={`cloudinary-uploadwidget-${Math.floor(Math.random() * 100)}`}
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={handleOnLoad}
        onError={(e) => console.error(`Failed to load Cloudinary Upload Widget: ${e.message}`)}
      />
    </>
  );
};

export default CldUploadWidget;
