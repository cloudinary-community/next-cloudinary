import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

import { triggerOnIdle } from '../../lib/util';

import { CldUploadWidgetProps } from './CldUploadWidget.types';

const CldUploadWidget = ({
  children,
  onUpload,
  onError,
  options,
  signatureEndpoint,
  uploadPreset,
}: CldUploadWidgetProps) => {
  const cloudinary: any = useRef();
  const widget: any = useRef();

  const signed = !!signatureEndpoint;

  const [error, setError] = useState(undefined);
  const [results, setResults] = useState(undefined);

  useEffect(() => {
    if ( error && typeof onError === 'function' ) {
      onError(error, widget.current);
    }
  }, [error]);

  useEffect(() => {
    if ( results && typeof onUpload === 'function' ) {
      onUpload(results, widget.current);
    }
  }, [results]);


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

      if ( uploadResult?.event === 'success' ) {
        setResults(uploadResult);
      }
    });
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return (
    <>
      {typeof children === 'function' && children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        open,
      })}
      <Script
        id={`cloudinary-${Math.floor(Math.random() * 100)}`}
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        onLoad={handleOnLoad}
        onError={(e) => console.error(`Failed to load Cloudinary: ${e.message}`)}
      />
    </>
  );
};

export default CldUploadWidget;
