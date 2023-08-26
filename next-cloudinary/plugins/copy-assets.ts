import { Plugin } from 'esbuild'
import path from 'path';
import { readdir, copyFile, readFile, lstat } from 'fs/promises';
import { mkdirp } from 'mkdirp';

let hasWrittenAssets = false;

const assets = [
  'cloudinary-video-player/dist/cld-video-player.min.css',
  'cloudinary-video-player/dist/fonts'
];

export const plugin: Plugin = {
  name: 'copy-assets',
  setup: async () => {
    const rootPath = path.join(__dirname, '../');
    const distPath = path.join(rootPath, 'dist');

    if ( hasWrittenAssets ) return;

    await mkdirp(distPath);

    for ( const asset of assets ) {
      const assetPath = await resolveAssetPath(asset);

      if ( typeof assetPath === 'string' ) {
        const info = await lstat(assetPath);
        const isDirectory = info.isDirectory();
        let files;

        if ( isDirectory ) {
          const dirFiles = await readdir(assetPath);
          const dirName = path.basename(assetPath);

          files = dirFiles.map(dirFile => {
            return {
              path: path.join(assetPath, dirFile),
              name: path.join(dirName, dirFile)
            }
          });

          await mkdirp(path.join(distPath, dirName));
        } else {
          files = [{
            path: assetPath,
            name: path.basename(assetPath)
          }];
        }

        for ( const file of files ) {
          await copyFile(file.path, path.join(distPath, file.name));
        }
      }
    }

    hasWrittenAssets = true;
  }
}

async function resolveAssetPath(assetPath: string) {
  let filePath;
  let dirPath;
  
  // Check if it's a file in the active project root node_modules

  try {
    filePath = path.join('node_modules', assetPath);
    await readFile(filePath);
  } catch(e) {
    filePath = undefined;
  }

  // Check if it's a file in the workspace node_modules

  try {
    filePath = path.join('../node_modules', assetPath)
    await readFile(filePath);
  } catch(e) {
    filePath = undefined;
  }

  // If we've determined its a file, return early
  
  if ( filePath ) return filePath;

  // If it's not a file, maybe its a directory
  // First check in active project root

  try {
    dirPath = path.join('node_modules', assetPath)
    await readdir(dirPath);
  } catch(e) {
    dirPath = undefined;
  }

  // Then again in the workspace root

  try {
    dirPath = path.join('../node_modules', assetPath)
    await readdir(dirPath);
  } catch(e) {
    dirPath = undefined;
  }

  return dirPath;
}