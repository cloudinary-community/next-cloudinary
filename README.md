<img align="center" height="50" src="https://res.cloudinary.com/cloudinary-marketing/image/upload/f_auto,q_auto,h_100/v1595456749/creative_source/Logo/PNG/cloudinary_logo_blue_0720_2x.png" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img align="center" height="30" src="https://user-images.githubusercontent.com/1045274/189200861-1089b9db-5a78-4b43-9f6c-dfb1752c92f9.png" />

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

### Props

| Prop Name        | Type        | Example                      |
|------------------|-------------|------------------------------|
| crop             | string      | `"thumb"`                    |
| gravity          | string      | `"faces"`                    |
| overlays         | array       | See Below                    |
| removeBackground | bool/string | `true`                       |
| tint             | string      | `"tint:100:red:blue:yellow"` |
| underlays        | array       | See Below                    |

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
