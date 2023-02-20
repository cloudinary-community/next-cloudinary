import React from 'react';
import CldUploadWidget, { CldUploadWidgetProps } from '../CldUploadWidget';

export interface CldUploadButtonProps extends Omit<CldUploadWidgetProps, 'children'> {
  children?: JSX.Element | string | Array<JSX.Element|string>;
  onClick?: Function;
}

const CldUploadButton = ({
  children,
  onClick,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
  ...props
}: CldUploadButtonProps) => {
  return (
    <>
      <CldUploadWidget
        onUpload={onUpload}
        options={options}
        signatureEndpoint={signatureEndpoint}
        uploadPreset={uploadPreset}
      >
        {({ open }) => {
          function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
            e.preventDefault();

            open();

            if ( typeof onClick === 'function' ) {
              onClick(e);
            }
          }
          return (
            <button {...props} onClick={handleOnClick} >
              {children || 'Upload'}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default CldUploadButton;
