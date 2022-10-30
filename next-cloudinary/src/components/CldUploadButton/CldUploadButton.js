import CldUploadWidget from '../CldUploadWidget';

const CldUploadButton = ({
  options,
  onUpload,
  signatureEndpoint,
  children,
  ...props
}) => {
  return (
    <>
      <CldUploadWidget
        options={options}
        onUpload={onUpload}
        signatureEndpoint={signatureEndpoint}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick} {...props}>
              {children}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default CldUploadButton;
