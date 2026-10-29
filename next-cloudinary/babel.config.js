const { version } = require("./package.json");

module.exports = (api) => {
  const presets = [];

  if (api.env("test")) {
    presets.push([["@babel/preset-env", { targets: { node: "current" } }]]);
  }

  presets.push(["@babel/preset-react", { runtime: "automatic" }]);
  presets.push(["@babel/preset-typescript"]);

  return {
    presets,
    plugins: [
      // Inline the version used by src/constants/analytics.ts at build time instead of bundling package.json.
      function inlineNextCloudinaryVersion() {
        return {
          name: "inline-next-cloudinary-version",
          visitor: {
            ReferencedIdentifier(path) {
              if (path.node.name !== "__NEXT_CLOUDINARY_VERSION__") return;
              path.replaceWith({ type: "StringLiteral", value: version });
            },
          },
        };
      },
    ],
  };
};
