<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/62209650/196528621-b68e9e10-7e55-4c7d-9177-904cadbb4296.png" align="center" height=50>
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=50>
  <img alt="Cloudinary" src="https://user-images.githubusercontent.com/62209650/196528761-a815025a-271a-4d8e-ac7e-cea833728bf9.png" align="center" height=30>
</picture>
&ensp;&ensp;

######

<a href="https://github.com/cloudinary-community/next-cloudinary/actions/workflows/test_and_release.yml"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/cloudinary-community/next-cloudinary/test_and_release.yml?branch=main&label=Test%20%26%20Release&style=flat-square"></a> <a href="https://www.npmjs.com/package/next-cloudinary"><img alt="npm" src="https://img.shields.io/npm/v/next-cloudinary?style=flat-square"></a> <a href="https://bundlephobia.com/package/next-cloudinary"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/next-cloudinary?style=flat-square&label=Minified%20Size"></a> <a href="https://github.com/cloudinary-community/next-cloudinary/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/cloudinary-community/next-cloudinary?label=License&style=flat-square"></a>

# Next Cloudinary

High-performance image delivery and uploading at scale in Next.js powered by Cloudinary.

<a href="#-features">Features</a> • <a href="#-getting-started">Getting Started</a> • <a href="#%EF%B8%8F-community--support">Community & Support</a> • <a href="#-contributing">Contributing</a>

**This is a community library supported by the Cloudinary Developer Experience team.**

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

[Learn more about CldImage on the Next Cloudinary Docs](https://next.cloudinary.dev/cldimage/basic-usage)

### Generating an Social Media Card (Open Graph)

```
<CldOgImage src="<Public ID or Cloudinary URL>" text="Next Cloudinary" />
```

> Note: The width and height is not required (or recommended) to comply with standardized social media card sizing of a 2:1 aspect ratio.

[Learn more about CldOgImage on the Next Cloudinary Docs](https://next.cloudinary.dev/cldogimage/basic-usage)

### Other Use Cases

* [Background Removal](https://next.cloudinary.dev/guides/background-removal)
* [Image Overlays](https://next.cloudinary.dev/guides/image-overlays)
* [Image Underlays](https://next.cloudinary.dev/guides/image-underlays)
* [Social Media Card](https://next.cloudinary.dev/guides/social-media-card)
* [Text Overlays](https://next.cloudinary.dev/guides/text-overlays)

## ❤️ Community & Support

* [GitHub: Create an Issue](https://github.com/cloudinary-community/next-cloudinary/issues)
* [Twitter: @cloudinary](https://twitter.com/cloudinary)

## 🛠 Contributing

Please read [CONTRIBUTING.md](https://github.com/cloudinary-community/next-cloudinary/blob/main/CONTRIBUTING.md) prior to contributing.

### Working Locally

#### Installation

This project is using [pnpm](https://pnpm.io/) as a way to manage dependencies and workspaces.

With the project cloned, install the dependencies from the root of the project with:

```
pnpm install
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
pnpm upload
```

By default, the images inside of `scripts/images.json` will be uploaded to the "images" directory inside of your Cloudinary account. To change the location, add the `CLOUDINARY_IMAGES_DIRECTORY` environment variable with your preferred directory:

```
CLOUDINARY_IMAGES_DIRECTORY="<Your Directory>"
```

#### Running the Project

Once installed and configured, open two terminal tabs, navigating one to `next-cloudinary` and one to `docs`, running the following command in each:

```
pnpm dev
```

The project will now be available at <https://localhost:3000> or the configured local port.

### Running Tests

All tests are located inside of `next-cloudinary/tests` with a directory structure that should reflect `next-cloudinary/src`.

While inside `next-cloudinary`, run tests with:

```
pnpm test
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars.githubusercontent.com/u/1045274?v=4?s=100" width="100px;" alt="Colby Fayock"/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=colbyfayock" title="Documentation">📖</a> <a href="#example-colbyfayock" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/danielolaviobr"><img src="https://avatars.githubusercontent.com/u/64712584?v=4?s=100" width="100px;" alt="Daniel Olavio"/><br /><sub><b>Daniel Olavio</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=danielolaviobr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.ramadevsign.com"><img src="https://avatars.githubusercontent.com/u/50571688?v=4?s=100" width="100px;" alt="ramadevsign"/><br /><sub><b>ramadevsign</b></sub></a><br /><a href="#tool-orama254" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kbravh.dev"><img src="https://avatars.githubusercontent.com/u/30562119?v=4?s=100" width="100px;" alt="Karey Higuera"/><br /><sub><b>Karey Higuera</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=kbravh" title="Tests">⚠️</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=kbravh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Azanul"><img src="https://avatars.githubusercontent.com/u/42029519?v=4?s=100" width="100px;" alt="Azanul Haque"/><br /><sub><b>Azanul Haque</b></sub></a><br /><a href="#tool-Azanul" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/3t8"><img src="https://avatars.githubusercontent.com/u/62209650?v=4?s=100" width="100px;" alt="3t8"/><br /><sub><b>3t8</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=3t8" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/agbanusi"><img src="https://avatars.githubusercontent.com/u/53221092?v=4?s=100" width="100px;" alt="John Agbanusi"/><br /><sub><b>John Agbanusi</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=agbanusi" title="Code">💻</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=agbanusi" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://joanleon.dev"><img src="https://avatars.githubusercontent.com/u/1307927?v=4?s=100" width="100px;" alt="Joan León"/><br /><sub><b>Joan León</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=nucliweb" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.timbenniks.dev"><img src="https://avatars.githubusercontent.com/u/121096?v=4?s=100" width="100px;" alt="Tim Benniks"/><br /><sub><b>Tim Benniks</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=timbenniks" title="Code">💻</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=timbenniks" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/csgochan"><img src="https://avatars.githubusercontent.com/u/116420257?v=4?s=100" width="100px;" alt="csgochan"/><br /><sub><b>csgochan</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=csgochan" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/codingis4noobs2"><img src="https://avatars.githubusercontent.com/u/87560178?v=4?s=100" width="100px;" alt="codingis4noobs2"/><br /><sub><b>codingis4noobs2</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=codingis4noobs2" title="Code">💻</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=codingis4noobs2" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/michizhou"><img src="https://avatars.githubusercontent.com/u/33012425?v=4?s=100" width="100px;" alt="michizhou"/><br /><sub><b>michizhou</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=michizhou" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://leeconlin.co.uk"><img src="https://avatars.githubusercontent.com/u/1023581?v=4?s=100" width="100px;" alt="Lee Conlin"/><br /><sub><b>Lee Conlin</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=hades200082" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wannabe-polyglot.com"><img src="https://avatars.githubusercontent.com/u/1134611?v=4?s=100" width="100px;" alt="Ryan Smith"/><br /><sub><b>Ryan Smith</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=tanzoniteblack" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mtliendo"><img src="https://avatars.githubusercontent.com/u/5106417?v=4?s=100" width="100px;" alt="Michael Liendo"/><br /><sub><b>Michael Liendo</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=mtliendo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jackblatch"><img src="https://avatars.githubusercontent.com/u/98260549?v=4?s=100" width="100px;" alt="Jack"/><br /><sub><b>Jack</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=jackblatch" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mcgois"><img src="https://avatars.githubusercontent.com/u/1241779?v=4?s=100" width="100px;" alt="Matheus Cabral"/><br /><sub><b>Matheus Cabral</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=mcgois" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Elegidoadedo"><img src="https://avatars.githubusercontent.com/u/26023012?v=4?s=100" width="100px;" alt="Jose Morales"/><br /><sub><b>Jose Morales</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Elegidoadedo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/ericpfister55/"><img src="https://avatars.githubusercontent.com/u/9849849?v=4?s=100" width="100px;" alt="Eric Pfister"/><br /><sub><b>Eric Pfister</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=PfisterFactor" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JoshuaRotimi"><img src="https://avatars.githubusercontent.com/u/62189959?v=4?s=100" width="100px;" alt="Joshua Olorunnipa"/><br /><sub><b>Joshua Olorunnipa</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=JoshuaRotimi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://harindra.netlify.app"><img src="https://avatars.githubusercontent.com/u/92938055?v=4?s=100" width="100px;" alt="Hari"/><br /><sub><b>Hari</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=NateNear" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://msk4862.github.io"><img src="https://avatars.githubusercontent.com/u/24875366?v=4?s=100" width="100px;" alt="Shoaib Asgar"/><br /><sub><b>Shoaib Asgar</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=msk4862" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dev-yemi.vercel.app/"><img src="https://avatars.githubusercontent.com/u/68167320?v=4?s=100" width="100px;" alt="Adeyanju Adeyemi"/><br /><sub><b>Adeyanju Adeyemi</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=DevYemi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.simonbukin.com"><img src="https://avatars.githubusercontent.com/u/8992420?v=4?s=100" width="100px;" alt="Simon"/><br /><sub><b>Simon</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=simonbukin" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://robray.dev/"><img src="https://avatars.githubusercontent.com/u/1377253?v=4?s=100" width="100px;" alt="Richard Oliver Bray"/><br /><sub><b>Richard Oliver Bray</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=RichardBray" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zecka"><img src="https://avatars.githubusercontent.com/u/18116930?v=4?s=100" width="100px;" alt="zecka"/><br /><sub><b>zecka</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=zecka" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HarshitVashisht11"><img src="https://avatars.githubusercontent.com/u/120767685?v=4?s=100" width="100px;" alt="Harshit Vashisht"/><br /><sub><b>Harshit Vashisht</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=HarshitVashisht11" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://sahil9001.github.io"><img src="https://avatars.githubusercontent.com/u/32628578?v=4?s=100" width="100px;" alt="Sahil Silare"/><br /><sub><b>Sahil Silare</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=sahil9001" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://yashmathur.live"><img src="https://avatars.githubusercontent.com/u/69838816?v=4?s=100" width="100px;" alt="Yash Mathur"/><br /><sub><b>Yash Mathur</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Yash-sudo-web" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mr-loop-1"><img src="https://avatars.githubusercontent.com/u/62374784?v=4?s=100" width="100px;" alt="Abdul Samad"/><br /><sub><b>Abdul Samad</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=mr-loop-1" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DevRish"><img src="https://avatars.githubusercontent.com/u/78094670?v=4?s=100" width="100px;" alt="Rishav Chattopadhyay"/><br /><sub><b>Rishav Chattopadhyay</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=DevRish" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Prathamesh010"><img src="https://avatars.githubusercontent.com/u/41731424?v=4?s=100" width="100px;" alt="Prathamesh Gawas"/><br /><sub><b>Prathamesh Gawas</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Prathamesh010" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://victory-nwani.dev"><img src="https://avatars.githubusercontent.com/u/29664439?v=4?s=100" width="100px;" alt="Nwani Victory"/><br /><sub><b>Nwani Victory</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=vickywane" title="Documentation">📖</a> <a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=vickywane" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://neilblaze.live"><img src="https://avatars.githubusercontent.com/u/48355572?v=4?s=100" width="100px;" alt="Pratyay Banerjee"/><br /><sub><b>Pratyay Banerjee</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Neilblaze" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/saai-syvendra"><img src="https://avatars.githubusercontent.com/u/157691467?v=4?s=100" width="100px;" alt="Saai Syvendra"/><br /><sub><b>Saai Syvendra</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=saai-syvendra" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zaki-Mohd"><img src="https://avatars.githubusercontent.com/u/181067270?v=4?s=100" width="100px;" alt="Mohammad Zaki"/><br /><sub><b>Mohammad Zaki</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Zaki-Mohd" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thinkverse"><img src="https://avatars.githubusercontent.com/u/2221746?v=4?s=100" width="100px;" alt="Kim Hallberg"/><br /><sub><b>Kim Hallberg</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=thinkverse" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Waqibsk"><img src="https://avatars.githubusercontent.com/u/162541991?v=4?s=100" width="100px;" alt="Md Waqib Sk"/><br /><sub><b>Md Waqib Sk</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Waqibsk" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://arjuncodess.is-a.dev/"><img src="https://avatars.githubusercontent.com/u/137415649?v=4?s=100" width="100px;" alt="Arjun Vijay Prakash"/><br /><sub><b>Arjun Vijay Prakash</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=ArjunCodess" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://musaddiq625.carrd.co"><img src="https://avatars.githubusercontent.com/u/37911054?v=4?s=100" width="100px;" alt="Musaddiq Ahmed Khan"/><br /><sub><b>Musaddiq Ahmed Khan</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=Musaddiq625" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SarthakJain29"><img src="https://avatars.githubusercontent.com/u/93116216?v=4?s=100" width="100px;" alt="Sarthak Jain"/><br /><sub><b>Sarthak Jain</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=SarthakJain29" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HRIDYANSHU054"><img src="https://avatars.githubusercontent.com/u/124202756?v=4?s=100" width="100px;" alt="Hridyanshu"/><br /><sub><b>Hridyanshu</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=HRIDYANSHU054" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://anurag2787.vercel.app/"><img src="https://avatars.githubusercontent.com/u/143180737?v=4?s=100" width="100px;" alt="Anurag Yadav"/><br /><sub><b>Anurag Yadav</b></sub></a><br /><a href="https://github.com/cloudinary-community/next-cloudinary/commits?author=anurag2787" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
