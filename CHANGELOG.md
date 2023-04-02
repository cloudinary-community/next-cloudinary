# [4.2.0](https://github.com/colbyfayock/next-cloudinary/compare/v4.1.1...v4.2.0) (2023-04-02)


### Features

* Fixes colors property not working ([#174](https://github.com/colbyfayock/next-cloudinary/issues/174)) ([9a862d9](https://github.com/colbyfayock/next-cloudinary/commit/9a862d9ffcb58fc0a2ce3744e8f3e22fa1507c20)), closes [#173](https://github.com/colbyfayock/next-cloudinary/issues/173)

## [4.1.1](https://github.com/colbyfayock/next-cloudinary/compare/v4.1.0...v4.1.1) (2023-03-31)


### Bug Fixes

* Keys Optional for ClgOgImage ([#172](https://github.com/colbyfayock/next-cloudinary/issues/172)) ([fda6e4c](https://github.com/colbyfayock/next-cloudinary/commit/fda6e4cc56bb90205682a8f9627ff17f51b717f5))

# [4.1.0](https://github.com/colbyfayock/next-cloudinary/compare/v4.0.3...v4.1.0) (2023-03-30)


### Features

* Add keys to CldOgImage to prevent excessive meta tag rendering ([#171](https://github.com/colbyfayock/next-cloudinary/issues/171)) ([4e60da5](https://github.com/colbyfayock/next-cloudinary/commit/4e60da585d587ac6ab1811c2a32a089d62b212a8)), closes [#167](https://github.com/colbyfayock/next-cloudinary/issues/167)

## [4.0.3](https://github.com/colbyfayock/next-cloudinary/compare/v4.0.2...v4.0.3) (2023-03-30)


### Bug Fixes

* CldOgImage Types Missing Definitions ([#168](https://github.com/colbyfayock/next-cloudinary/issues/168)) ([34a4044](https://github.com/colbyfayock/next-cloudinary/commit/34a4044c0634d2da43f348645bcf5a761675bd73)), closes [#166](https://github.com/colbyfayock/next-cloudinary/issues/166)

## [4.0.2](https://github.com/colbyfayock/next-cloudinary/compare/v4.0.1...v4.0.2) (2023-03-24)


### Bug Fixes

* Upgrades Cloudinary Util to fix parsing public IDs with a . ([#165](https://github.com/colbyfayock/next-cloudinary/issues/165)) ([d108d02](https://github.com/colbyfayock/next-cloudinary/commit/d108d02493ae174000312ded525a91613eec6b5a)), closes [#164](https://github.com/colbyfayock/next-cloudinary/issues/164)

## [4.0.1](https://github.com/colbyfayock/next-cloudinary/compare/v4.0.0...v4.0.1) (2023-03-22)


### Bug Fixes

* Help reduce Signed Upload errors ([#160](https://github.com/colbyfayock/next-cloudinary/issues/160)) ([d323e33](https://github.com/colbyfayock/next-cloudinary/commit/d323e33c80e74f0a864e6478422d4407d732d47a)), closes [#158](https://github.com/colbyfayock/next-cloudinary/issues/158)

# [4.0.0](https://github.com/colbyfayock/next-cloudinary/compare/v3.4.0...v4.0.0) (2023-03-01)


### bug

* Fixes Raw Transformations Conflicting with Resizing ([#151](https://github.com/colbyfayock/next-cloudinary/issues/151)) ([a64e8ca](https://github.com/colbyfayock/next-cloudinary/commit/a64e8cac60577b1c209336ece0bed9f02310c453)), closes [#149](https://github.com/colbyfayock/next-cloudinary/issues/149)


### BREAKING CHANGES

* this changes where the rawTransformations property gets applied in the transformation chain to avoid conflicting with transformations performed by 3rd party tooling.

# [3.4.0](https://github.com/colbyfayock/next-cloudinary/compare/v3.3.0...v3.4.0) (2023-02-28)


### Features

* CldVideoPlayer Component ([#126](https://github.com/colbyfayock/next-cloudinary/issues/126)) ([feb8c72](https://github.com/colbyfayock/next-cloudinary/commit/feb8c729212db22ab802a54cb1a9aee6b4658f1d))

# [3.3.0](https://github.com/colbyfayock/next-cloudinary/compare/v3.2.0...v3.3.0) (2023-02-27)


### Features

* Add More CldUploadWidget Types ([#141](https://github.com/colbyfayock/next-cloudinary/issues/141)) ([f414312](https://github.com/colbyfayock/next-cloudinary/commit/f41431299c70f2c6704d23786d4c8340e2111043)), closes [#140](https://github.com/colbyfayock/next-cloudinary/issues/140)

# [3.2.0](https://github.com/colbyfayock/next-cloudinary/compare/v3.1.0...v3.2.0) (2023-02-27)


### Features

* Fixes SEO parsing, Sanitize SVG by Default ([#146](https://github.com/colbyfayock/next-cloudinary/issues/146)) ([cfee825](https://github.com/colbyfayock/next-cloudinary/commit/cfee825ef4f7cd9b2d64531f377713d59e98d5f0)), closes [#145](https://github.com/colbyfayock/next-cloudinary/issues/145) [#92](https://github.com/colbyfayock/next-cloudinary/issues/92)

# [3.1.0](https://github.com/colbyfayock/next-cloudinary/compare/v3.0.0...v3.1.0) (2023-02-26)


### Features

* Fixes query parameter breaking CldImage parsing ([#143](https://github.com/colbyfayock/next-cloudinary/issues/143)) ([483c31e](https://github.com/colbyfayock/next-cloudinary/commit/483c31e2845fcf3f04aa6b4bb0de2a64cd0bc406)), closes [#142](https://github.com/colbyfayock/next-cloudinary/issues/142)

# [3.0.0](https://github.com/colbyfayock/next-cloudinary/compare/v2.3.2...v3.0.0) (2023-02-23)


### Bug Fixes

* Fix Handling CldUploadWidget Callback Updates to State ([#138](https://github.com/colbyfayock/next-cloudinary/issues/138)) ([f847db3](https://github.com/colbyfayock/next-cloudinary/commit/f847db31aada6fb4ec71c182c64084a711919902)), closes [#128](https://github.com/colbyfayock/next-cloudinary/issues/128)


### BREAKING CHANGES

* CldUploadWidget onUpload property no longer passes an error object as the first argument. The first argument is now the result object. A separate onError property was added to handle errors.

## [2.3.2](https://github.com/colbyfayock/next-cloudinary/compare/v2.3.1...v2.3.2) (2023-02-20)


### Bug Fixes

* Fix Next 13 Use Client Directive ([#136](https://github.com/colbyfayock/next-cloudinary/issues/136)) ([9ee962d](https://github.com/colbyfayock/next-cloudinary/commit/9ee962d3db20a69482e2509123521f1422a9d318)), closes [#135](https://github.com/colbyfayock/next-cloudinary/issues/135)

## [2.3.1](https://github.com/colbyfayock/next-cloudinary/compare/v2.3.0...v2.3.1) (2023-02-18)


### Bug Fixes

* Import CldImageProps from URL Loader ([#134](https://github.com/colbyfayock/next-cloudinary/issues/134)) ([e443b05](https://github.com/colbyfayock/next-cloudinary/commit/e443b0535f8daaba10fb5822622fa95930fb980d)), closes [#133](https://github.com/colbyfayock/next-cloudinary/issues/133)

# [2.3.0](https://github.com/colbyfayock/next-cloudinary/compare/v2.2.0...v2.3.0) (2023-02-17)


### Features

* Migrate to tsup, Fix Types Exports ([#131](https://github.com/colbyfayock/next-cloudinary/issues/131)) ([c51d54f](https://github.com/colbyfayock/next-cloudinary/commit/c51d54fd499c8bfd62a00502d79be0ec458b7822)), closes [#130](https://github.com/colbyfayock/next-cloudinary/issues/130)

# [2.2.0](https://github.com/colbyfayock/next-cloudinary/compare/v2.1.2...v2.2.0) (2023-02-08)


### Features

* Updates Text Style Parameters ([#125](https://github.com/colbyfayock/next-cloudinary/issues/125)) ([a5cc717](https://github.com/colbyfayock/next-cloudinary/commit/a5cc717fe75a6b960b5140e001ae4ec6d0caf701)), closes [#108](https://github.com/colbyfayock/next-cloudinary/issues/108)

## [2.1.2](https://github.com/colbyfayock/next-cloudinary/compare/v2.1.1...v2.1.2) (2023-02-07)


### Bug Fixes

* Improve Text Handling ([#123](https://github.com/colbyfayock/next-cloudinary/issues/123)) ([94be084](https://github.com/colbyfayock/next-cloudinary/commit/94be084aa07590d1d0fd98b60107e35ad1798b86)), closes [#107](https://github.com/colbyfayock/next-cloudinary/issues/107)

## [2.1.1](https://github.com/colbyfayock/next-cloudinary/compare/v2.1.0...v2.1.1) (2023-02-06)


### Bug Fixes

* Adds requestIdleCallback fallback ([#122](https://github.com/colbyfayock/next-cloudinary/issues/122)) ([27aac1a](https://github.com/colbyfayock/next-cloudinary/commit/27aac1af2b87b46aa4c891c79620288985bd56e5)), closes [#121](https://github.com/colbyfayock/next-cloudinary/issues/121)

# [2.1.0](https://github.com/colbyfayock/next-cloudinary/compare/v2.0.1...v2.1.0) (2023-02-04)


### Features

* Create UploadWidget instance when browser is idle ([#118](https://github.com/colbyfayock/next-cloudinary/issues/118)) ([92637d6](https://github.com/colbyfayock/next-cloudinary/commit/92637d67de386f5f6a5b96480bc036ef9d717ec1)), closes [#117](https://github.com/colbyfayock/next-cloudinary/issues/117)

## [2.0.1](https://github.com/colbyfayock/next-cloudinary/compare/v2.0.0...v2.0.1) (2023-02-03)


### Bug Fixes

* Fixes preserveTransformations ([#114](https://github.com/colbyfayock/next-cloudinary/issues/114)) ([d2070f3](https://github.com/colbyfayock/next-cloudinary/commit/d2070f32b6fcad208efdb0e1d3e868e051d6fe6e)), closes [#82](https://github.com/colbyfayock/next-cloudinary/issues/82)

# [2.0.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.12.3...v2.0.0) (2023-02-03)


### Features

* Cloudinary Loader as External Dependency ([#112](https://github.com/colbyfayock/next-cloudinary/issues/112)) ([56cde4c](https://github.com/colbyfayock/next-cloudinary/commit/56cde4ce131a787355672d56efd7cc4d6d66b404)), closes [#111](https://github.com/colbyfayock/next-cloudinary/issues/111)


### BREAKING CHANGES

* this removes the exports of constructoCloudinaryUrl and qualifiers from the Next Cloudinary package

## [1.12.3](https://github.com/colbyfayock/next-cloudinary/compare/v1.12.2...v1.12.3) (2023-02-03)


### Bug Fixes

* Support fill=true by not applying a width if not set ([#113](https://github.com/colbyfayock/next-cloudinary/issues/113)) ([cfd14d0](https://github.com/colbyfayock/next-cloudinary/commit/cfd14d083180ea2720b5c54fada7753658166234)), closes [#110](https://github.com/colbyfayock/next-cloudinary/issues/110)

## [1.12.2](https://github.com/colbyfayock/next-cloudinary/compare/v1.12.1...v1.12.2) (2023-01-25)


### Bug Fixes

* TSConfig Fix ([e802818](https://github.com/colbyfayock/next-cloudinary/commit/e8028188b854bb21bc152117c23e058ed42e766a))

## [1.12.1](https://github.com/colbyfayock/next-cloudinary/compare/v1.12.0...v1.12.1) (2023-01-25)


### Bug Fixes

* Make `tsc` directly emit typescript declarations ([#109](https://github.com/colbyfayock/next-cloudinary/issues/109)) ([ce77c76](https://github.com/colbyfayock/next-cloudinary/commit/ce77c76f30bce4bd5ecfd70505d549732eb196bf)), closes [#106](https://github.com/colbyfayock/next-cloudinary/issues/106)

# [1.12.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.11.0...v1.12.0) (2023-01-25)


### Features

* Analytics ID - Part 2 ([#105](https://github.com/colbyfayock/next-cloudinary/issues/105)) ([ab7ba44](https://github.com/colbyfayock/next-cloudinary/commit/ab7ba447af6eff264d9baf984ca513b5910a316e))

# [1.11.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.10.0...v1.11.0) (2023-01-20)


### Features

* Ryan/typescript ([#93](https://github.com/colbyfayock/next-cloudinary/issues/93)) ([1028df2](https://github.com/colbyfayock/next-cloudinary/commit/1028df286ca5a94a9c6734eba00b8f95d9a36ba0)), closes [#77](https://github.com/colbyfayock/next-cloudinary/issues/77)

# [1.10.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.9.0...v1.10.0) (2023-01-19)


### Features

* Revert "Analytics ID" ([#103](https://github.com/colbyfayock/next-cloudinary/issues/103)) ([61bf1d2](https://github.com/colbyfayock/next-cloudinary/commit/61bf1d2e3c63a95bc74792a27ccc000c83ca15ab)), closes [colbyfayock/next-cloudinary#102](https://github.com/colbyfayock/next-cloudinary/issues/102)

# [1.9.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.8.3...v1.9.0) (2023-01-19)


### Features

* Analytics ID ([#102](https://github.com/colbyfayock/next-cloudinary/issues/102)) ([c9ea705](https://github.com/colbyfayock/next-cloudinary/commit/c9ea705eefef6273a98f14e23ebff1a4ef0763c8))

## [1.8.3](https://github.com/colbyfayock/next-cloudinary/compare/v1.8.2...v1.8.3) (2023-01-19)


### Bug Fixes

* Fixes Underlay Sizing ([#101](https://github.com/colbyfayock/next-cloudinary/issues/101)) ([0345d92](https://github.com/colbyfayock/next-cloudinary/commit/0345d920ade0a19b568d1c6dd415684e989f93a5)), closes [#100](https://github.com/colbyfayock/next-cloudinary/issues/100)

## [1.8.2](https://github.com/colbyfayock/next-cloudinary/compare/v1.8.1...v1.8.2) (2023-01-17)


### Bug Fixes

* Added `'use client';` to CldImage component ([#98](https://github.com/colbyfayock/next-cloudinary/issues/98)) ([387f6e3](https://github.com/colbyfayock/next-cloudinary/commit/387f6e32307a93d787408828a59a302967bb8c23)), closes [#97](https://github.com/colbyfayock/next-cloudinary/issues/97)
* forcing patch ([c1b9ef8](https://github.com/colbyfayock/next-cloudinary/commit/c1b9ef81fe2bfec772f9e078b57f809153ff44ae))

## [1.8.1](https://github.com/colbyfayock/next-cloudinary/compare/v1.8.0...v1.8.1) (2023-01-04)


### Bug Fixes

* Fixes Extra Comma in Overlay Transformation ([#91](https://github.com/colbyfayock/next-cloudinary/issues/91)) ([7d1fd1c](https://github.com/colbyfayock/next-cloudinary/commit/7d1fd1cde4833be33d6a0d100f5abb1ee755424d)), closes [#87](https://github.com/colbyfayock/next-cloudinary/issues/87)

# [1.8.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.7.0...v1.8.0) (2023-01-04)


### Features

* constructCloudinaryUrl ([#90](https://github.com/colbyfayock/next-cloudinary/issues/90)) ([34bb37f](https://github.com/colbyfayock/next-cloudinary/commit/34bb37f0503af3d92ce857871f1e9a963e27c435)), closes [#89](https://github.com/colbyfayock/next-cloudinary/issues/89)

# [1.7.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.6.0...v1.7.0) (2023-01-04)


### Features

* Overlay Effects ([#88](https://github.com/colbyfayock/next-cloudinary/issues/88)) ([69590f3](https://github.com/colbyfayock/next-cloudinary/commit/69590f3b26907936db49d2db6ce6579b16e7b76a)), closes [#85](https://github.com/colbyfayock/next-cloudinary/issues/85)

# [1.6.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.5.0...v1.6.0) (2022-12-22)


### Features

* Top Level Effects Array, Background Effect ([#84](https://github.com/colbyfayock/next-cloudinary/issues/84)) ([0f36ca2](https://github.com/colbyfayock/next-cloudinary/commit/0f36ca27b5da4b7db23fe51516ddc4d973f6653c)), closes [#81](https://github.com/colbyfayock/next-cloudinary/issues/81)

# [1.5.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.4.0...v1.5.0) (2022-12-22)


### Features

* Overlay Effects, Add Opacity ([#83](https://github.com/colbyfayock/next-cloudinary/issues/83)) ([25cc4f0](https://github.com/colbyfayock/next-cloudinary/commit/25cc4f0a0a643cca71e40fd7f561602b8755e7a9)), closes [#80](https://github.com/colbyfayock/next-cloudinary/issues/80)

# [1.4.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.3.0...v1.4.0) (2022-12-17)


### Features

* Implement error polling for image processing with timeout ([#56](https://github.com/colbyfayock/next-cloudinary/issues/56)) ([85efc54](https://github.com/colbyfayock/next-cloudinary/commit/85efc54fec0c56cc40fa8cb499a7133efda56407)), closes [#11](https://github.com/colbyfayock/next-cloudinary/issues/11) [#1](https://github.com/colbyfayock/next-cloudinary/issues/1)

# [1.3.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.2.0...v1.3.0) (2022-12-08)


### Features

* Extract transformations and effect in url construct ([#53](https://github.com/colbyfayock/next-cloudinary/issues/53)) ([4990d9e](https://github.com/colbyfayock/next-cloudinary/commit/4990d9e3b235a21b5f7be1c41b139503fd4665d7)), closes [#9](https://github.com/colbyfayock/next-cloudinary/issues/9)

# [1.2.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.1.0...v1.2.0) (2022-11-29)


### Features

* Zoom ([#71](https://github.com/colbyfayock/next-cloudinary/issues/71)) ([aace374](https://github.com/colbyfayock/next-cloudinary/commit/aace374927be74fe91d853fa0c3491e28fd4790b)), closes [#70](https://github.com/colbyfayock/next-cloudinary/issues/70)

# [1.1.0](https://github.com/colbyfayock/next-cloudinary/compare/v1.0.0...v1.1.0) (2022-11-28)


### Features

* Named Transformations ([#69](https://github.com/colbyfayock/next-cloudinary/issues/69)) ([3f7c8bf](https://github.com/colbyfayock/next-cloudinary/commit/3f7c8bf1b86b9aabebd390a80d150afb77ed4e29)), closes [#68](https://github.com/colbyfayock/next-cloudinary/issues/68)

# [1.0.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.9.0...v1.0.0) (2022-11-15)


### Features

* v1.0.0 ([6facf45](https://github.com/colbyfayock/next-cloudinary/commit/6facf45c31d6ee4adb1bc500f4b6f23742597b6d))


### BREAKING CHANGES

* cutting release

# [0.9.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.8.0...v0.9.0) (2022-11-09)


### Features

* React peer dependencies ([#65](https://github.com/colbyfayock/next-cloudinary/issues/65)) ([5a084d5](https://github.com/colbyfayock/next-cloudinary/commit/5a084d5bee603fbb64727819ffcaf0ac0ea1b9bd)), closes [#64](https://github.com/colbyfayock/next-cloudinary/issues/64)

# [0.8.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.7.0...v0.8.0) (2022-11-04)


### Features

* force feat for remote overlays ([e939175](https://github.com/colbyfayock/next-cloudinary/commit/e939175d028c2191e278c69f830c5bd3ead93af9))

# [0.7.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.6.1...v0.7.0) (2022-11-04)


### Features

* force fix for responsive ([44dc4af](https://github.com/colbyfayock/next-cloudinary/commit/44dc4af3f150cf5eaf9927a3284c53147f54cd59))

## [0.6.1](https://github.com/colbyfayock/next-cloudinary/compare/v0.6.0...v0.6.1) (2022-11-03)


### Bug Fixes

* Captures deliveryType as prop ([#58](https://github.com/colbyfayock/next-cloudinary/issues/58)) ([f4268bb](https://github.com/colbyfayock/next-cloudinary/commit/f4268bbe89455f01d0dc7dd7a6503cf3592a1e18)), closes [#57](https://github.com/colbyfayock/next-cloudinary/issues/57)

# [0.6.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.5.0...v0.6.0) (2022-10-31)


### Features

* Upload Widget Docs & Simplification ([#55](https://github.com/colbyfayock/next-cloudinary/issues/55)) ([5b1492f](https://github.com/colbyfayock/next-cloudinary/commit/5b1492f48d9e6793e502fe3dc9ca64ddaa830522)), closes [#11](https://github.com/colbyfayock/next-cloudinary/issues/11) [#54](https://github.com/colbyfayock/next-cloudinary/issues/54)

# [0.5.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.4.1...v0.5.0) (2022-10-28)


### Features

* qualifiers, docs, ogimages ([dd64908](https://github.com/colbyfayock/next-cloudinary/commit/dd6490841ce8d801da36ea00c5f98ec7cab83538))

## [0.4.1](https://github.com/colbyfayock/next-cloudinary/compare/v0.4.0...v0.4.1) (2022-10-28)


### Bug Fixes

* Build package before publish ([#52](https://github.com/colbyfayock/next-cloudinary/issues/52)) ([7d13602](https://github.com/colbyfayock/next-cloudinary/commit/7d13602bb4a1726e8acaf8495747f9f5a0022bc6)), closes [#51](https://github.com/colbyfayock/next-cloudinary/issues/51)

# [0.4.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.3.0...v0.4.0) (2022-10-27)


### Features

* next/future/image ([#3](https://github.com/colbyfayock/next-cloudinary/issues/3)) ([9c271ef](https://github.com/colbyfayock/next-cloudinary/commit/9c271ef47a5aba55ea168995c345bc835f22ef16))

# [0.3.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.2.0...v0.3.0) (2022-10-27)


### Bug Fixes

* Fix "gravity" is read-only ([#32](https://github.com/colbyfayock/next-cloudinary/issues/32)) ([14c6cd7](https://github.com/colbyfayock/next-cloudinary/commit/14c6cd72c5a086fe0ff655654a475b8dfc6bb4ce))


### Features

* CldOgImage ([#30](https://github.com/colbyfayock/next-cloudinary/issues/30)) ([4aa5ff7](https://github.com/colbyfayock/next-cloudinary/commit/4aa5ff7e5d2e57e1c440b0e857c21c77ff5ffe2a))

# [0.2.0](https://github.com/colbyfayock/next-cloudinary/compare/v0.1.1...v0.2.0) (2022-10-21)


### Features

* fetch delivery type ([fa7da45](https://github.com/colbyfayock/next-cloudinary/commit/fa7da4571bc5917a4afd48a5125cc6406284c835))

## [0.1.1](https://github.com/colbyfayock/next-cloudinary/compare/v0.1.0...v0.1.1) (2022-10-11)


### Bug Fixes

* **tests:** Seed loader tests ([#25](https://github.com/colbyfayock/next-cloudinary/issues/25)) ([bd54e48](https://github.com/colbyfayock/next-cloudinary/commit/bd54e48f008dee612116e4eff29aef7500b20621))

# 1.0.0 (2022-10-09)


### Bug Fixes

* Remove EOF ([ff91bb8](https://github.com/colbyfayock/next-cloudinary/commit/ff91bb8dbad2a18aa92154e6cf1a82c38b6975f0))
* remove redundant return ([5c2d4eb](https://github.com/colbyfayock/next-cloudinary/commit/5c2d4eb63f6677b400e8a2935d665c0aee79efe8))
* Revert lint and let to const ([c3b16b8](https://github.com/colbyfayock/next-cloudinary/commit/c3b16b8b7866c3948f9944a706958cd61cf07dd3))


### Features

* image url as src prop ([c5e9b23](https://github.com/colbyfayock/next-cloudinary/commit/c5e9b2313710acb064b2ce6b50693cbd90ea5b56))
* implement new method to get the public id ([cb38d01](https://github.com/colbyfayock/next-cloudinary/commit/cb38d01ee9feabd7cdd061669ec16572c393e9a5))
