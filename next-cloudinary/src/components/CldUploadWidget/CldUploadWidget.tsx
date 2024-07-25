import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInstanceMethods,
  CloudinaryUploadWidgetInstanceMethodCloseOptions,
  CloudinaryUploadWidgetInstanceMethodDestroyOptions,
  CloudinaryUploadWidgetInstanceMethodOpenOptions,
  CloudinaryUploadWidgetSources,
  CloudinaryUploadWidgetError
} from '@cloudinary-util/types';

import { triggerOnIdle } from '../../lib/util';

import {
  CldUploadEventAction,
  CldUploadEventCallback,
  CldUploadWidgetCloudinaryInstance,
  CldUploadWidgetProps,
  CldUploadWidgetWidgetInstance,
} from './CldUploadWidget.types';

import { getCloudinaryConfig } from "../../lib/cloudinary";

const WIDGET_WATCHED_EVENTS = [
  'success',
];

const WIDGET_EVENTS: { [key: string]: string } = {
  'abort': 'onAbort',
  'batch-cancelled': 'onBatchCancelled',
  'close': 'onClose',
  'display-changed': 'onDisplayChanged',
  'publicid': 'onPublicId',
  'queues-end': 'onQueuesEnd',
  'queues-start': 'onQueuesStart',
  'retry': 'onRetry',
  'show-completed': 'onShowCompleted',
  'source-changed': 'onSourceChanged',
  'success': 'onSuccess',
  'tags': 'onTags',
  'upload-added': 'onUploadAdded',
}

const CldUploadWidget = ({
  children,
  config,
  onError,
  onOpen,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
  ...props
}: CldUploadWidgetProps) => {
  const cloudinary: CldUploadWidgetCloudinaryInstance = useRef();
  const widget: CldUploadWidgetWidgetInstance = useRef();

  const signed = !!signatureEndpoint;

  const { onSuccessAction } = props;

  const [error, setError] = useState<CloudinaryUploadWidgetError | undefined>(undefined);
  const [results, setResults] = useState<CloudinaryUploadWidgetResults | undefined>(undefined);
  const [isScriptLoading, setIsScriptLoading] = useState(true);

  // When creating a signed upload, you need to provide both your Cloudinary API Key
  // as well as a signature generator function that will sign any paramters
  // either on page load or during the upload process. Read more about signed uploads at:
  // https://cloudinary.com/documentation/upload_widget#signed_uploads

  const cloudinaryConfig = getCloudinaryConfig(config);
  const { cloudName, apiKey } = cloudinaryConfig?.cloud;

  const uploadOptions = {
    cloudName,
    uploadPreset: uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    apiKey,
    ...options,
  };

  if ( signed ) {
    uploadOptions.uploadSignature = generateSignature;

    if (!uploadOptions.apiKey) {
      console.warn(`Missing dependency: Signed Upload requires an API key`);
    }
  }

  // Handle result states and callbacks

  useEffect(() => {
    if ( typeof results === 'undefined' ) return;

    const isSuccess = results.event === 'success';

    if ( isSuccess && typeof onUpload === 'function' ) {
      if ( process.env.NODE_ENVIRONMENT === 'development' ) {
        console.warn('The onUpload callback is deprecated. Please use onSuccess instead.');
      }
      onUpload(results, widget.current);
    }
  }, [results])

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    setIsScriptLoading(false);

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

  useEffect(() => {
    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    }
  }, [])

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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((r) => r.json())
      .then(({ signature }) => {
        callback(signature);
      });
  }

  /**
   * Instance Methods
   * Gives the ability to interface directly with the Upload Widget instance methods like open and close
   * https://cloudinary.com/documentation/upload_widget_reference#instance_methods
   */

  function invokeInstanceMethod<
    TMethod extends keyof CloudinaryUploadWidgetInstanceMethods
  >(
    method: TMethod,
    options: Parameters<
      CloudinaryUploadWidgetInstanceMethods[TMethod]
    > = [] as Parameters<CloudinaryUploadWidgetInstanceMethods[TMethod]>
  ) {
    if (!widget.current) {
      widget.current = createWidget();
    }

    if (typeof widget?.current[method] === "function") {
      return widget.current[method](...options);
    }
  }

  function close(options?: CloudinaryUploadWidgetInstanceMethodCloseOptions) {
    invokeInstanceMethod('close', [options]);
  }

  function destroy(options?: CloudinaryUploadWidgetInstanceMethodDestroyOptions) {
    return invokeInstanceMethod('destroy', [options]);
  }

  function hide() {
    invokeInstanceMethod('hide');
  }

  function isDestroyed() {
    return invokeInstanceMethod('isDestroyed');
  }

  function isMinimized() {
    return invokeInstanceMethod('isMinimized');
  }

  function isShowing() {
    return invokeInstanceMethod('isShowing');
  }

  function minimize() {
    invokeInstanceMethod('minimize');
  }

  function open(widgetSource?: CloudinaryUploadWidgetSources, options?: CloudinaryUploadWidgetInstanceMethodOpenOptions) {
    invokeInstanceMethod('open', [widgetSource, options]);

    if ( typeof onOpen === 'function' ) {
      onOpen(widget.current);
    }
  }

  function show() {
    invokeInstanceMethod('show');
  }

  function update() {
    invokeInstanceMethod('update');
  }

  const instanceMethods: CloudinaryUploadWidgetInstanceMethods = {
    close,
    destroy,
    hide,
    isDestroyed,
    isMinimized,
    isShowing,
    minimize,
    open,
    show,
    update,
  }

  /**
   * createWidget
   * @description Creates a new instance of the Cloudinary widget and stores in a ref
   */

  function createWidget() {
    return cloudinary.current?.createUploadWidget(uploadOptions, (uploadError: CloudinaryUploadWidgetError, uploadResult: CloudinaryUploadWidgetResults) => {
      if ( uploadError && uploadError !== null ) {
        setError(uploadError);

        if ( typeof onError === 'function' ) {
          onError(uploadError, {
            widget: widget.current,
            ...instanceMethods
          });
        }
      }

      if ( typeof uploadResult?.event === 'string' ) {
        if ( WIDGET_WATCHED_EVENTS.includes(uploadResult?.event as string) ) {
          setResults(uploadResult);
        }

        const widgetEvent = WIDGET_EVENTS[uploadResult.event] as keyof typeof props;

        if ( typeof widgetEvent === 'string' && typeof props[widgetEvent] === 'function' ) {
          const callback = props[widgetEvent] as CldUploadEventCallback;
          callback(uploadResult, {
            widget: widget.current,
            ...instanceMethods
          });
        }

        const widgetEventAction = `${widgetEvent}Action` as keyof typeof props;

        if ( widgetEventAction && typeof props[widgetEventAction] === 'function' ) {
          const action = props[widgetEventAction] as CldUploadEventAction;
          uploadResult.event === 'success' && action(uploadResult);
         }
      }
    });
  }

  return (
    <>
      {typeof children === 'function' && children({
        cloudinary: cloudinary.current,
        widget: widget.current,
        results,
        error,
        isLoading: isScriptLoading,
        ...instanceMethods,
      })}
      <Script
        id={`cloudinary-uploadwidget-${Math.floor(Math.random() * 100)}`}
        src="https://upload-widget.cloudinary.com/global/all.js"
        onLoad={handleOnLoad}
        onError={(e) => console.error(`Failed to load Cloudinary Upload Widget: ${e.message}`)}
      />
    </>
  );
};

export default CldUploadWidget;