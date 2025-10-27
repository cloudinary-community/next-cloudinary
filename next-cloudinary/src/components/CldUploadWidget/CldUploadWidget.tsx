import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import {
  generateSignatureCallback,
  generateUploadWidgetResultCallback,
  getUploadWidgetOptions,
  UPLOAD_WIDGET_EVENTS,
} from '@cloudinary-util/url-loader';
import {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInstanceMethods,
  CloudinaryUploadWidgetInstanceMethodCloseOptions,
  CloudinaryUploadWidgetInstanceMethodDestroyOptions,
  CloudinaryUploadWidgetInstanceMethodOpenOptions,
  CloudinaryUploadWidgetSources,
  CloudinaryUploadWidgetError,
} from '@cloudinary-util/types';

import { triggerOnIdle } from '../../lib/util';

import {
  CldUploadEventAction,
  CldUploadEventCallback,
  CldUploadWidgetCloudinaryInstance,
  CldUploadWidgetProps,
  CldUploadWidgetWidgetInstance,
} from './CldUploadWidget.types';

import { getCloudinaryConfig } from '../../lib/cloudinary';

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
  const cloudinary: CldUploadWidgetCloudinaryInstance = useRef<any>();
  const widget: CldUploadWidgetWidgetInstance = useRef<any>();

  const [error, setError] = useState<CloudinaryUploadWidgetError | undefined>(undefined);
  const [results, setResults] = useState<CloudinaryUploadWidgetResults | undefined>(undefined);
  const [isScriptLoading, setIsScriptLoading] = useState(true);

  // Signed uploads configuration
  const cloudinaryConfig = getCloudinaryConfig(config);

  const uploadSignature =
    signatureEndpoint &&
    generateSignatureCallback({
      signatureEndpoint: String(signatureEndpoint),
      fetch,
    });

  const uploadOptions = getUploadWidgetOptions(
    {
      uploadPreset: uploadPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      uploadSignature,
      ...options,
    },
    cloudinaryConfig
  );

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
  };

  const resultsCallback = generateUploadWidgetResultCallback({
    onError: (uploadError) => {
      setError(uploadError);

      if (typeof onError === 'function') {
        onError(uploadError, {
          widget: widget.current,
          ...instanceMethods,
        });
      }
    },
    onResult: (uploadResult) => {
      if (typeof uploadResult?.event !== 'string') return;

      setResults(uploadResult);

      const widgetEvent = UPLOAD_WIDGET_EVENTS[uploadResult.event] as keyof typeof props;

      if (typeof widgetEvent === 'string' && typeof props[widgetEvent] === 'function') {
        const callback = props[widgetEvent] as CldUploadEventCallback;
        callback(uploadResult, {
          widget: widget.current,
          ...instanceMethods,
        });
      }

      const widgetEventAction = `${widgetEvent}Action` as keyof typeof props;

      if (widgetEventAction && typeof props[widgetEventAction] === 'function') {
        const action = props[widgetEventAction] as CldUploadEventAction;
        action(uploadResult);
      }
    },
  });

  // Handle result states and deprecated onUpload
  useEffect(() => {
    if (typeof results === 'undefined') return;

    const isSuccess = results.event === 'success';

    if (isSuccess && typeof onUpload === 'function') {
      if (process.env.NODE_ENV === 'development') {
        console.warn('The onUpload callback is deprecated. Please use onSuccess instead.');
      }
      onUpload(results, widget.current);
    }
  }, [results]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * handleOnLoad
   * Stores the Cloudinary window instance to a ref when the widget script loads.
   * Guard against double initialization.
   */
  function handleOnLoad() {
    // already wired
    if ((window as any).cloudinary && cloudinary.current) {
      setIsScriptLoading(false);
      return;
    }

    setIsScriptLoading(false);

    if (!cloudinary.current) {
      cloudinary.current = (window as any).cloudinary;
    }

    // Create the widget during browser idle time to minimize main-thread work.
    triggerOnIdle(() => {
      if (!widget.current) {
        widget.current = createWidget();
      }
    });
  }

  useEffect(() => {
    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
  }, []);

  /**
   * Instance method invoker with lazy create
   */
  function invokeInstanceMethod<TMethod extends keyof CloudinaryUploadWidgetInstanceMethods>(
    method: TMethod,
    options: Parameters<CloudinaryUploadWidgetInstanceMethods[TMethod]> = [] as Parameters<
      CloudinaryUploadWidgetInstanceMethods[TMethod]
    >
  ) {
    if (!widget.current) {
      widget.current = createWidget();
    }

    if (typeof widget?.current?.[method] === 'function') {
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

    if (typeof onOpen === 'function') {
      onOpen(widget.current);
    }
  }

  function show() {
    invokeInstanceMethod('show');
  }

  function update() {
    invokeInstanceMethod('update');
  }

  /**
   * createWidget
   * Guard against running before the script is ready.
   */
  function createWidget() {
    if (!cloudinary.current?.createUploadWidget) return undefined;
    return cloudinary.current.createUploadWidget(uploadOptions, resultsCallback);
  }

  return (
    <>
      {typeof children === 'function' &&
        children({
          cloudinary: cloudinary.current,
          widget: widget.current,
          results,
          error,
          isLoading: isScriptLoading,
          ...instanceMethods,
        })}

      <Script
        id="cloudinary-uploadwidget"
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="lazyOnload" // defer network to idle
        onLoad={handleOnLoad}
        onError={(e: any) => console.error('Failed to load Cloudinary Upload Widget', e)}
      />
    </>
  );
};

export default CldUploadWidget;
