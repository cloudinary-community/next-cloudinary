import { Plugin } from 'esbuild'
import path from 'path';
import { createWriteStream } from 'fs';
import { mkdirp } from 'mkdirp';
import https from 'https';

const version = '1.9.16';

const assets = [
  `https://unpkg.com/cloudinary-video-player@${version}/dist/cld-video-player.css`,
  {
    directory: 'fonts',
    assets: [
      `https://unpkg.com/cloudinary-video-player@${version}/dist/fonts/cloudinary_icon_for_black_bg.svg`,
      `https://unpkg.com/cloudinary-video-player@${version}/dist/fonts/cloudinary_icon_for_white_bg.svg`,
    ]
  }
];

let hasWrittenAssets = false;

export const plugin: Plugin = {
  name: 'copy-assets',
  setup: async () => {
    const rootPath = path.join(__dirname, '../');
    const distPath = path.join(rootPath, 'dist');

    if ( hasWrittenAssets ) return;

    await mkdirp(distPath);

    for ( const asset of assets ) {

      if ( typeof asset === 'string' ) {
        const writePath = path.join(distPath, path.basename(asset));
        await downloadFile(asset, writePath);
        console.log(`Wrote ${asset} to ${writePath}`);
      } else if ( typeof asset.directory === 'string' ) {
        await mkdirp(path.join(distPath, asset.directory));

        for ( const dirAsset of asset.assets ) {
          const writePath = path.join(distPath, asset.directory, path.basename(dirAsset));
          await downloadFile(dirAsset, writePath);
          console.log(`Wrote ${dirAsset} to ${writePath}`);
        }
      }
    }

    hasWrittenAssets = true;
  }
}

/**
 * downloadFile
 */

function downloadFile(assetUrl: string, writePath: string) {
  return new Promise<void>((resolve) => {
    const file = createWriteStream(writePath);
    https.get(assetUrl, function(response) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
  })
}