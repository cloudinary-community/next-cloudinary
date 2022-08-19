# Next Cloudinary

> 🚨 EXPERIMENTAL

## Installation

* Install the dependency
```
yarn add next-cloudinary
# or
npm install next-cloudinary
```

* Import component
```
import { CldImage } from 'next-cloudinary';
```

* Add environment variable
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

## Usage

Pass in your Public ID as the `src` of the component:

```
<CldImage
  width="600"
  height="600"
  src="<Public ID>"
/>
```

CldImage is a wrapper around the Next.js Image component, meaning, pretty much everything will work similarly.

The difference is how we're sourcing the image, where we directly reference the Public ID of the Cloudinary asset.

### To Remove the Background

```
<CldImage
  width="600"
  height="600"
  src="<Public ID>"
  removeBackground
/>
```
