import { default as UploadWidget } from "./index";

const UploadButton = ({ onUpload, options, signed, label, ...props }) => {
  return (
    <>
      <UploadWidget signed={signed} options={options} onUpload={onUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick} {...props}>
              {label || "Upload an Image"}
            </button>
          );
        }}
      </UploadWidget>
    </>
  );
};

export default UploadButton;
