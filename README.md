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

<a href="https://github.com/colbyfayock/next-cloudinary/actions/workflows/test_and_release.yml"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/colbyfayock/next-cloudinary/test_and_release.yml?branch=main&label=Test%20%26%20Release&style=flat-square"></a> <a href="https://www.npmjs.com/package/next-cloudinary"><img alt="npm" src="https://img.shields.io/npm/v/next-cloudinary?style=flat-square"></a> <a href="https://github.com/colbyfayock/next-cloudinary/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/colbyfayock/next-cloudinary?label=License&style=flat-square"></a>

# Next Cloudinary

High-performance image delivery and uploading at scale in Next.js powered by Cloudinary.

<a href="#-features">Features</a> • <a href="#-getting-started">Getting Started</a> • <a href="#%EF%B8%8F-community--support">Community & Support</a> • <a href="#-contributing">Contributing</a>

**This plugin is a community library and not officially supported by Cloudinary.**

## ✨ Features

* Automatically optimize images and deliver in modern formats
* Remove backgrounds from images
* Dynamically add image and text overlays to images
* AI-based cropping and resizing
* Transform images using color and effects
* Generate Open Graph Social Media cards on the fly
* Drop-in Upload Widget
* ...all at scale with Cloudinary


## 🚀 Getting Started

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

### Adding an Image

```
import { CldImage } from 'next-cloudinary';

<CldImage width="600" height="600" src="<Public ID or Cloudinary URL>" alt="<Alt Text>" />
```

[Learn more about CldImage on the Next Cloudinary Docs](https://next-cloudinary.spacejelly.dev/components/cldimage/basic-usage)

### Generating an Social Media Card (Open Graph)

```
<CldOgImage src="<Public ID or Cloudinary URL>" text="Next Cloudinary" />
```

> Note: The width and height is not required (or recommended) to comply with standardized social media card sizing of a 2:1 aspect ratio.

[Learn more about CldOgImage on the Next Cloudinary Docs](https://next-cloudinary.spacejelly.dev/components/cldogimage/basic-usage)

### Other Use Cases

* [Background Removal](https://next-cloudinary.spacejelly.dev/use-cases/background-removal)
* [Image Overlays](https://next-cloudinary.spacejelly.dev/use-cases/image-overlays)
* [Image Underlays](https://next-cloudinary.spacejelly.dev/use-cases/image-underlays)
* [Social Media Card](https://next-cloudinary.spacejelly.dev/use-cases/social-media-card)
* [Text Overlays](https://next-cloudinary.spacejelly.dev/use-cases/text-overlays)

## ❤️ Community & Support

* [GitHub: Create an Issue](https://github.com/colbyfayock/next-cloudinary/issues)
* [Twitter: @colbyfayock](https://twitter.com/colbyfayock)

## 🛠 Contributing

Please read [CONTRIBUTING.md](https://github.com/colbyfayock/next-cloudinary/blob/main/CONTRIBUTING.md) prior to contributing.

### Working Locally

#### Installation

This project is currently using [yarn](https://yarnpkg.com/) as a way to manage dependencies and workspaces.

With the project cloned, install the dependencies from the root of the project with:

```
yarn install
```

#### Configuration

To work on the project, you need to have an active Cloudinary account. With the account, configure a `.env.local` file inside of `docs` with:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloudinary Cloud Name>"
NEXT_PUBLIC_CLOUDINARY_API_KEY="<Your Cloudinary API Key>"
CLOUDINARY_API_SECRET="<Your Cloudinary API Secret>"
```

> Note: The Cloudinary account can be free, but some features may not work beyond free tier like Background Removal

The Cloud Name is required for all usage, where the API Key and Secret currently is only used for Upload Widget usage. The Upload Preset is additionally used for the Upload Widgets.

#### Uploading Example Images

In order to run the Docs project, you need to have the images referenced available inside of your Cloudinary account.

To do this, navigate to the `scripts` directory and first create a new `.env` file with:

```
CLOUDINARY_CLOUD_NAME="<Your Cloudinary Cloud Name>"
CLOUDINARY_API_KEY="<Your API Key>"
CLOUDINARY_API_SECRET="<Your API Secret>"
```

Then run the upload script with:

```
yarn upload
```

By default, the images inside of `scripts/images.json` will be uploaded to the "images" directory inside of your Cloudinary account. To change the location, add the `CLOUDINARY_IMAGES_DIRECTORY` environment variable with your preferred directory:

```
CLOUDINARY_IMAGES_DIRECTORY="<Your Directory>"
```

#### Running the Project

Once installed and configured, open two terminal tabs, navigating one to `next-cloudinary` and one to `docs`, running the following command in each:

```
yarn dev
```

The project will now be available at <https://localhost:3000> or the configured local port.

### Running Tests

All tests are located inside of `next-cloudinary/tests` with a directory structure that should reflect `next-cloudinary/src`.

While inside `next-cloudinary`, run tests with:

```
yarn test
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars.githubusercontent.com/u/1045274?v=4?s=100" width="100px;" alt="Colby Fayock"/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=colbyfayock" title="Documentation">📖</a> <a href="#example-colbyfayock" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/danielolaviobr"><img src="https://avatars.githubusercontent.com/u/64712584?v=4?s=100" width="100px;" alt="Daniel Olavio"/><br /><sub><b>Daniel Olavio</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=danielolaviobr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.ramadevsign.com"><img src="https://avatars.githubusercontent.com/u/50571688?v=4?s=100" width="100px;" alt="ramadevsign"/><br /><sub><b>ramadevsign</b></sub></a><br /><a href="#tool-orama254" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kbravh.dev"><img src="https://avatars.githubusercontent.com/u/30562119?v=4?s=100" width="100px;" alt="Karey Higuera"/><br /><sub><b>Karey Higuera</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=kbravh" title="Tests">⚠️</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=kbravh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Azanul"><img src="https://avatars.githubusercontent.com/u/42029519?v=4?s=100" width="100px;" alt="Azanul Haque"/><br /><sub><b>Azanul Haque</b></sub></a><br /><a href="#tool-Azanul" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/3t8"><img src="https://avatars.githubusercontent.com/u/62209650?v=4?s=100" width="100px;" alt="3t8"/><br /><sub><b>3t8</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=3t8" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/agbanusi"><img src="https://avatars.githubusercontent.com/u/53221092?v=4?s=100" width="100px;" alt="John Agbanusi"/><br /><sub><b>John Agbanusi</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=agbanusi" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=agbanusi" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://joanleon.dev"><img src="https://avatars.githubusercontent.com/u/1307927?v=4?s=100" width="100px;" alt="Joan León"/><br /><sub><b>Joan León</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=nucliweb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.timbenniks.dev"><img src="https://avatars.githubusercontent.com/u/121096?v=4?s=100" width="100px;" alt="Tim Benniks"/><br /><sub><b>Tim Benniks</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=timbenniks" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=timbenniks" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/csgochan"><img src="https://avatars.githubusercontent.com/u/116420257?v=4?s=100" width="100px;" alt="csgochan"/><br /><sub><b>csgochan</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=csgochan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/codingis4noobs2"><img src="https://avatars.githubusercontent.com/u/87560178?v=4?s=100" width="100px;" alt="codingis4noobs2"/><br /><sub><b>codingis4noobs2</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=codingis4noobs2" title="Code">💻</a> <a href="https://github.com/colbyfayock/next-cloudinary/commits?author=codingis4noobs2" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/michizhou"><img src="https://avatars.githubusercontent.com/u/33012425?v=4?s=100" width="100px;" alt="michizhou"/><br /><sub><b>michizhou</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=michizhou" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://leeconlin.co.uk"><img src="https://avatars.githubusercontent.com/u/1023581?v=4?s=100" width="100px;" alt="Lee Conlin"/><br /><sub><b>Lee Conlin</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=hades200082" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wannabe-polyglot.com"><img src="https://avatars.githubusercontent.com/u/1134611?v=4?s=100" width="100px;" alt="Ryan Smith"/><br /><sub><b>Ryan Smith</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=tanzoniteblack" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mtliendo"><img src="https://avatars.githubusercontent.com/u/5106417?v=4?s=100" width="100px;" alt="Michael Liendo"/><br /><sub><b>Michael Liendo</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=mtliendo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jackblatch"><img src="https://avatars.githubusercontent.com/u/98260549?v=4?s=100" width="100px;" alt="Jack"/><br /><sub><b>Jack</b></sub></a><br /><a href="https://github.com/colbyfayock/next-cloudinary/commits?author=jackblatch" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
