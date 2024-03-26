import { Plugin } from 'esbuild'
import path from 'path';
import { createWriteStream } from 'fs';
import { mkdirp } from 'mkdirp';
import https from 'https';

const PLAYER_VERSION = '1.11.1';

const assets = [
  {
    uri: `https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`,
    name: 'cld-video-player.css'
  },
  {
    directory: 'fonts',
    assets: [
      `https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/fonts/cloudinary_icon_for_black_bg.svg`,
      `https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/fonts/cloudinary_icon_for_white_bg.svg`,
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
      if ( typeof asset === 'string' || typeof asset.uri === 'string' ) {

        let name = asset.name;
        let uri = asset.uri;

        if ( typeof asset === 'string' ) {
          name = path.basename(asset);
          uri = asset;
        }

        const writePath = path.join(distPath, name);
        await downloadFile(uri, writePath);

        console.log(`Wrote ${uri} to ${writePath}`);
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