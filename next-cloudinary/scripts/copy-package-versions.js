const path = require("path");
const fs = require('fs').promises;

const files = [
  {
    'path': '../package.json',
    'export': 'NEXT_CLOUDINARY_VERSION'
  },
];

(async function run() {
  const versions = {};

  for ( const file of files ) {
    const data = await fs.readFile(path.resolve(__dirname, file.path), 'utf-8');
    const json = JSON.parse(data);
    versions[file.export] = json.version;
  };

  await fs.writeFile(path.resolve(__dirname, '../versions.ts'), `export const versions: Record<string, string> = ${JSON.stringify(versions)}`);

  console.log(`Copied package versions ${files.map(file => file.export).join(', ')} to ${path.resolve(__dirname, '../versions.ts')}`)
})();

