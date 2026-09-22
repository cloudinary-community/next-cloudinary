import { Plugin } from 'esbuild'
import path from 'path';
import { createWriteStream } from 'fs';
import { mkdirp } from 'mkdirp';
import https from 'https';

const PLAYER_VERSION = '4.1.2';

const assets = [
  {
    uri: `https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`,
    name: 'cld-video-player.css'
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
      const writePath = path.join(distPath, asset.name);
      await downloadFile(asset.uri, writePath);

      console.log(`Wrote ${asset.uri} to ${writePath}`);
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