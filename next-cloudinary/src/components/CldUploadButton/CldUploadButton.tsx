import React from 'react';
import CldUploadWidget, { CldUploadWidgetProps } from '../CldUploadWidget';

export interface CldUploadButtonProps extends Omit<CldUploadWidgetProps, 'children'> {
  className?: string;
  children?: JSX.Element | string | Array<JSX.Element|string>;
  onClick?: Function;
}

const CldUploadButton = ({
  className,
  children,
  onClick,
  onError,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
  ...props
}: CldUploadButtonProps) => {

  return (
    <>
      <CldUploadWidget
        onError={onError}
        onUpload={onUpload}
        options={options}
        signatureEndpoint={signatureEndpoint}
        uploadPreset={uploadPreset}
      >
        {({ open, isLoading }) => {
          function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();

            open();

            if ( typeof onClick === 'function' ) {
              onClick(e);
            }
          }
          return (
            <button {...props} className={className || ''} onClick={handleOnClick} disabled={isLoading} >
              {children || 'Upload'}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default CldUploadButton;
