import { default as UploadWidget } from "./index";

const UploadButton = ({
  onUpload,
  options,
  signed,
  label,
  children,
  ...props
}) => {
  return (
    <>
      <UploadWidget
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
      </UploadWidget>
    </>
  );
};

export default UploadButton;
