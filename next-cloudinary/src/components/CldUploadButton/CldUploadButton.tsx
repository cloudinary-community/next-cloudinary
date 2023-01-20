import CldUploadWidget from '../CldUploadWidget';

const CldUploadButton = ({
  children,
  onClick,
  onUpload,
  options,
  signatureEndpoint,
  uploadPreset,
  ...props
}) => {
  return (
    <>
      <CldUploadWidget
        onUpload={onUpload}
        options={options}
        signatureEndpoint={signatureEndpoint}
        uploadPreset={uploadPreset}
      >
        {({ open }) => {
          function handleOnClick(e) {
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
