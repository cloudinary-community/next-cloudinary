import CldUploadWidget from '../CldUploadWidget';

const CldUploadButton = ({
  onUpload,
  options,
  signed,
  label,
  children,
  ...props
}) => {
  return (
    <>
      <CldUploadWidget
        signed={signed}
        options={options}
        onUpload={onUpload}
        signatureEndpoint={signed ?? props.signatureEndpoint}
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
