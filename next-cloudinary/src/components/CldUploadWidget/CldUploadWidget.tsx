import { useRef } from 'react';
import Script from 'next/script';

const CldUploadWidget = ({
  children,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
}) => {
  const cloudinary = useRef();
  const widget = useRef();

  const signed = !!signatureEndpoint;

  /**
   * generateSignature
   * @description Makes a request to an endpoint to sign Cloudinary parameters as part of widget creation
   */

  function generateSignature(callback, paramsToSign) {
    fetch(signatureEndpoint, {
      method: "POST",
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

    // @ts-ignore
    return cloudinary.current?.createUploadWidget(
      uploadOptions,
      function (error, result) {
        // The callback is a bit more chatty than failed or success so
        // only trigger when one of those are the case. You can additionally
        // create a separate handler such as onEvent and trigger it on
        // ever occurance
        if (error || result.event === "success") {
          onUpload(error, result, widget?.current);
        }
      }
    );
  }

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  function open() {
    if (!widget?.current) {
      widget.current = createWidget();
    }

    // @ts-ignore
    widget?.current && widget.current.open();
  }

  /**
   * handleOnLoad
   * @description Stores the Cloudinary window instance to a ref when the widget script loads
   */

  function handleOnLoad() {
    // @ts-ignore
    cloudinary.current = window.cloudinary;
  }

  return (
    <>
      {children({
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
