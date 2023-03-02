import { Sandpack } from "@codesandbox/sandpack-react";

import nextCloudinaryPkg from '../../../next-cloudinary/package.json';
import nextCloudinary from "../../internals/next-cloudinary?raw";

const nextConfgJs = `
process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}";

module.exports = {
  reactStrictMode: true
};
`

const styleCss = `
img {
  max-width: 100%;
  height: auto;
}
`;

const Playground = (props) => {
  const { children, filename } = props;
  return (
    <Sandpack
      template="nextjs"
      files={{
        [filename]: {
          code: children,
          active: true
        },
        '/next.config.js': {
          code: nextConfgJs,
          readOnly: true,
          hidden: true
        },
        '/style.css': {
          code: styleCss,
          readOnly: true,
          hidden: true
        },
        '/node_modules/@internals/next-cloudinary/package.json': {
          hidden: true,
          code: JSON.stringify(nextCloudinaryPkg),
        },
        '/node_modules/@internals/next-cloudinary/index.js': {
          hidden: true,
          code: nextCloudinary,
        },
      }}
      options={{
        showLineNumbers: true,
        showInlineErrors: true,
        showTabs: false,
        closableTabs: false,
      }}
    />
  );
};

export default Playground;