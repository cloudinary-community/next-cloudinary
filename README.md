<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/62209650/196528621-b68e9e10-7e55-4c7d-9177-904cadbb4296.png" align="center" height=50>
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=50>
  <img alt="Cloudinary" src="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=30>
</picture>
&ensp;&ensp;
<picture style="padding: 30px">
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/62209650/196529551-917766a7-6d73-4a0b-9f80-db31ac62358f.png" align="center" height=30>
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/62209650/196529695-8c260b0b-b5e6-44ae-bf71-db3c28534b20.png" align="center" height=30>
  <img alt="Nextjs" src="https://user-images.githubusercontent.com/62209650/196529695-8c260b0b-b5e6-44ae-bf71-db3c28534b20.png" align="center" height=30>
</picture>

######

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Cloudinary Next.js Component

Get the best of Cloudinary in Next.js with the CldImage component!

> 🚨 EXPERIMENTAL: while this should be working pretty well, it's consider experimental, so use at your own risk!

**This plugin is not officially supported by Cloudinary.**

## ⚡️ Getting Started

### Installation

* Install `next-cloudinary` with:
```
yarn add next-cloudinary
# or
npm install next-cloudinary
```

* Add an environment variable with your Cloud Name:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

* Import the CldImage component:
```
import { CldImage } from 'next-cloudinary';
```

### Usage

The basic required props include `width`, `height`, and `src`:

```
<CldImage
  width="600"
  height="600"
  src="<Public ID>"
/>
```

You can further take advantage of Cloudinary features like background removal and overlays by adding additional props:

```
<CldImage
  width="600"
  height="600"
  src="<Public ID>"
  crop="thumb"
  gravity="faces"
  removeBackground
  tint="100:blue:green:red"
  underlays={[{
    publicId: '<Public ID>',
    width: 600,
    height: 600,
    crop: 'fill'
  }]}
/>
```

As CldImage is a wrapper around the Next.js Image component, all built-in Image component features will work out-of-the-box including the `layout` prop.

## 🛠 Configuration

### General Props

| Prop Name          | Type               | Example                      |
|--------------------|--------------------|------------------------------|
| crop               | string             | `"thumb"`                    |
| gravity            | string             | `"faces"`                    |
| overlays           | array              | See Below                    |
| rawTransformations | array              | `['e_blur:2000']`            |
| removeBackground   | bool/string        | `true`                       |
| underlays          | array              | See Below                    |
| zoompan            | bool/string/object | See Below                    |

### Effect Props

| Prop Name          | Type        | Example                      |
|------------------  |-------------|------------------------------|
| art                | string      | `"al_dente"`                 |
| autoBrightness     | bool/string | `true`, `"80"`               |
| autoColor          | bool/string | `true`, `"80"`               |
| autoContrast       | bool/string | `true`, `"80"`               |
| assistColorblind   | bool/string | `true`, `"20"`, `"xray"`     |
| blackwhite         | bool/string | `true`, `"40"`               |
| blur               | bool/string | `true`, `"800"`              |
| blurFaces          | bool/string | `true`, `"800"`              |
| blurRegion         | bool/string | `true`, `"1000,h_425,w_550,x_600,y_400"` |
| brightness         | bool/string | `true`, `"100"`                      |
| brightnessHSB      | bool/string | `true`, `"100"`                      |
| cartoonify         | bool/string | `true`, `"70:80"`            |
| colorize           | string      | `"35,co_darkviolet"`         |
| contrast           | bool/string | `true`, `"100"`, `"level_-70"`       |
| distort            | string      | `"150:340:1500:10:1500:1550:50:1000"`, `"arc:180.0"` |
| fillLight          | bool/string | `true`, `"70:20"`                    |
| gamma              | bool/string | `true`, `"100"`                      |
| gradientFade       | bool/string | `true`, `"symmetric:10,x_0.2,y_0.4"` |
| grayscale          | bool        | `true`                       |
| improve            | bool/string | `true`, `"50"`, `"indoor"`   |
| negate             | bool        | `true`                       |
| oilPaint           | bool/string | `true`, `"40"`               |
| outline            | bool/string | `true`, `"40"`, `"outer:15:200"` |
| pixelate           | bool/string | `true`, `"20"`               |
| pixelateFaces      | bool/string | `true`, `"20"`               |
| pixelateRegion     | bool/string | `true`, `"35,h_425,w_550,x_600,y_400"` |
| redeye             | bool/string | `true`                       |
| replaceColor       | string      | `"saddlebrown"`, `"2F4F4F:20"`, `"silver:55:89b8ed"` |
| saturation         | bool/string | `true`, `"70"`                       |
| sepia              | bool/string | `true`, `"50"`               |
| shadow             | bool/string | `true`, `"50,x_-15,y_15"`    |
| sharpen            | bool/string | `true`, `"100"`              |
| shear              | string      | `"20.0:0.0"`                 |
| simulateColorblind | bool/string | `"deuteranopia"`             |
| tint               | bool/string | `true`, `"100:red:blue:yellow"` |
| unsharpMask        | bool/string | `true`, `"500"`              |
| vectorize          | bool/string | `true`, `"3:0.5"`            |
| vibrance           | bool/string | `true`, `"70"`               |
| vignette           | bool/string | `true`, `"30"`               |

[View the Cloudinary docs](https://cloudinary.com/documentation/transformation_reference#e_effect) to see learn more about using effects.

### Background Removal

Removing backgrounds require enabling the [Cloudinary AI Background Removal Add-On](https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon) which includes a free tier for getting started.

Once enabled, you can simply apply the `removeBackground` parameter.

**Example:**

```
<CldImage
  ...
  removeBackground
/>
```

### Overlays

The `overlays` prop is an array of objects with the following configuration options:

| Property Name    | Type        | Example                              |
|------------------|-------------|--------------------------------------|
| effects          | array       | See Below                            |
| position         | object      | See Below                            |
| publicId         | string      | `"thumb"`                            |
| text             | object      | See Below                            |

The position property can include:

| Property Name    | Type        | Example                              |
|------------------|-------------|--------------------------------------|
| angle            | number      | `45`                                 |
| gravity          | string      | '"north_west"'                       |
| x                | number      | `10`                                 |
| y                | number      | `10`                                 |

Objects in the effects array can include:

| Property Name    | Type        | Example                              |
|------------------|-------------|--------------------------------------|
| aspectRatio      | string      | `"3.0"`                              |
| crop             | string      | `10`                                 |
| gravity          | string      | '"north_west"'                       |
| height           | number      | '600'                                |
| width            | number      | '600'                                |

The text property can include:

| Property Name    | Type        | Example                              |
|------------------|-------------|--------------------------------------|
| color            | string      | `"blueviolet"`                       |
| fontFamily       | string      | `"Open Sans"`                        |
| fontSize         | number      | `48`                                 |
| fontWeight       | string      | `"bold"`                             |
| letterSpacing    | number      | `"14"`                               |
| textDecoration   | string      | `"underline"`                        |

#### Adding Images

You can add images on top of other images by using image-based overlays.

**Example:**

```
<CldImage
  ...
  overlays={[{
    publicId: '<Public ID>',
    position: {
      x: 10,
      y: 10,
      gravity: 'north_west',
    },
    effects: [
      {
        crop: 'fill',
        gravity: 'auto',
        width: 500,
        height: 500
      }
    ]
  }]}
/>
```

#### Adding Text

You can add text on top of your image with text-based overlays.

**Example:**

```
<CldImage
  ...
  overlays={[{
    width: 2670 - 20,
    crop: 'fit',
    position: {
      x: 10,
      y: 10,
      gravity: 'north_west',
    },
    text: {
      color: 'blueviolet',
      fontFamily: 'Source Sans Pro',
      fontSize: 120,
      fontWeight: 'bold',
      textDecoration: 'underline',
      letterSpacing: 14,
      text: 'Text'
    }
  }]}
/>
```

### Underlays

Underlays function very similar to overlays in terms of options, however they **do not support text**.

See the examples above under Overlays to learn more about the available configurations.

**Example:**

```
<CldImage
  ...
  underlays={[{
    publicId: '<Public ID>',
    width: 1920,
    height: 1200,
    crop: 'fill'
  }]}
/>
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars.githubusercontent.com/u/1045274?v=4?s=100" width="100px;" alt="Colby Fayock"/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=colbyfayock" title="Documentation">📖</a> <a href="#example-colbyfayock" title="Examples">💡</a></td>
      <td align="center"><a href="https://github.com/danielolaviobr"><img src="https://avatars.githubusercontent.com/u/64712584?v=4?s=100" width="100px;" alt="Daniel Olavio"/><br /><sub><b>Daniel Olavio</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=danielolaviobr" title="Code">💻</a></td>
      <td align="center"><a href="http://www.ramadevsign.com"><img src="https://avatars.githubusercontent.com/u/50571688?v=4?s=100" width="100px;" alt="ramadevsign"/><br /><sub><b>ramadevsign</b></sub></a><br /><a href="#tool-orama254" title="Tools">🔧</a></td>
      <td align="center"><a href="https://kbravh.dev"><img src="https://avatars.githubusercontent.com/u/30562119?v=4?s=100" width="100px;" alt="Karey Higuera"/><br /><sub><b>Karey Higuera</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=kbravh" title="Tests">⚠️</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=kbravh" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Azanul"><img src="https://avatars.githubusercontent.com/u/42029519?v=4?s=100" width="100px;" alt="Azanul Haque"/><br /><sub><b>Azanul Haque</b></sub></a><br /><a href="#tool-Azanul" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/3t8"><img src="https://avatars.githubusercontent.com/u/62209650?v=4?s=100" width="100px;" alt="3t8"/><br /><sub><b>3t8</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=3t8" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/agbanusi"><img src="https://avatars.githubusercontent.com/u/53221092?v=4?s=100" width="100px;" alt="John Agbanusi"/><br /><sub><b>John Agbanusi</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=agbanusi" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=agbanusi" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
