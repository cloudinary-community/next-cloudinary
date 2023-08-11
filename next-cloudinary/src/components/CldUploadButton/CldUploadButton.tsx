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
  onOpen,
  onUpload,
  onAbort,
  onBatchCancelled,
  onClose,
  onDisplayChanged,
  onPublicId,
  onQueuesEnd,
  onQueuesStart,
  onRetry,
  onShowCompleted,
  onSourceChanged,
  onSuccess,
  onTags,
  onUploadAdded,
  options,
  signatureEndpoint,
  uploadPreset,
  ...props
}: CldUploadButtonProps) => {

  return (
    <>
      <CldUploadWidget
        onError={onError}
        onOpen={onOpen}
        onUpload={onUpload}
        onAbort={onAbort}
        onBatchCancelled={onBatchCancelled}
        onClose={onClose}
        onDisplayChanged={onDisplayChanged}
        onPublicId={onPublicId}
        onQueuesEnd={onQueuesEnd}
        onQueuesStart={onQueuesStart}
        onRetry={onRetry}
        onShowCompleted={onShowCompleted}
        onSourceChanged={onSourceChanged}
        onSuccess={onSuccess}
        onTags={onTags}
        onUploadAdded={onUploadAdded}
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
