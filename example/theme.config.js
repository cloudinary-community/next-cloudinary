export default {
  projectLink: 'https://github.com/colbyfayock/next-cloudinary', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/colbyfayock/next-cloudinary/tree/main/docs',
  titleSuffix: ' – Next Cloudinary',
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Colby Fayock`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <strong>Next Cloudinary</strong>
  ),
  head: (
    <>
      <title>Next Cloudinary</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Powerful image and video APIs in Next.js with Cloudinary" />
      <meta name="og:title" content="Next Cloudinary" />
    </>
  ),
}