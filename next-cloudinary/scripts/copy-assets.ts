import path from 'path';
import { createWriteStream } from 'fs';
import { mkdirp } from 'mkdirp';
import https from 'https';

const PLAYER_VERSION = '1.11.1';

const assets = [
  {
    uri: `https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`,
    name: 'cld-video-player.css'
  }
];

let hasWrittenAssets = false;

async function copyAssets() {
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
    }
  }

  hasWrittenAssets = true;
}

/**
 * downloadFile
 */

function downloadFile(assetUrl: string, writePath: string) {
  return new Promise<void>((resolve, reject) => {
    https.get(assetUrl, function(response) {
      // Fail instead of writing an error page (e.g. a 404) to disk as the asset
      if ( response.statusCode !== 200 ) {
        response.resume();
        reject(new Error(`Failed to download ${assetUrl}: HTTP ${response.statusCode}`));
        return;
      }

      const file = createWriteStream(writePath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', reject);
    }).on('error', reject);
  })
}

copyAssets().catch((error) => {
  console.error(error);
  process.exit(1);
});
