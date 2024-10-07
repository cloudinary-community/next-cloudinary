"use strict";

const path = require("path");
const { markdownMagic } = require("markdown-magic");

const config = {
  transforms: {
    PKGJSON: require("markdown-magic-package-json"),
  },
};

const markdownPath = path.join(__dirname, "../README.md");
markdownMagic(markdownPath, config);
