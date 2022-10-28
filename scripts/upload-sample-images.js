require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const images = require('./images.json');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const folder = process.env.CLOUDINARY_EXAMPLES_DIRECTORY || 'images';

(async function run() {
  console.log(`Uploading ${images.length} images to cloud "${process.env.CLOUDINARY_CLOUD_NAME}"...`);

  for ( let i = 0; i < images.length; i++ ) {
    const { url, public_id } = images[i];

    try {
      const result = await cloudinary.uploader.upload(url, {
        folder,
        public_id
      });
      console.log(`Success: ${result.secure_url}`);
    } catch(e) {
      console.log(`Error uploading ${public_id}: ${e.message}`);
    }
  }

  console.log('Finished.');
})();
