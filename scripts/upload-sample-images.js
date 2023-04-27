require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const assets = require('./assets.json');
const images = require('./images.json');
const videos = require('./videos.json');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

(async function run() {
  
  await uploadAssets(assets, {
    folder: process.env.CLOUDINARY_ASSETS_DIRECTORY || 'assets',
    resourceType: 'image'
  });
  
  await uploadAssets(images, {
    folder: process.env.CLOUDINARY_IMAGES_DIRECTORY || 'images',
    resourceType: 'image'
  });

  await uploadAssets(videos, {
    folder: process.env.CLOUDINARY_VIDEOS_DIRECTORY || 'videos',
    resourceType: 'video'
  });

  console.log('Finished.');
})();

/**
 * uploadAssets
 */

async function uploadAssets(assets, { folder, resourceType }) {
  console.log(`Uploading ${assets.length} assets to cloud "${process.env.CLOUDINARY_CLOUD_NAME}" in folder ${folder}...`);

  for ( let i = 0; i < assets.length; i++ ) {
    const { url, publicId, resourceType: assetResourceType } = assets[i];

    try {
      const result = await cloudinary.uploader.upload(url, {
        folder,
        public_id: publicId,
        resource_type: assetResourceType || resourceType
      });
      console.log(`Success: ${result.secure_url}`);
    } catch(e) {
      console.log(`Error uploading ${publicId}: ${e.message}`);
    }
  }
}