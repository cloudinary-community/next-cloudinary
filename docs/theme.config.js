import { CldOgImage } from '../next-cloudinary';

export default {
  projectLink: 'https://github.com/colbyfayock/next-cloudinary', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/colbyfayock/next-cloudinary/tree/main/docs',
  titleSuffix: ' – Next Cloudinary',
  footerText: `MIT ${new Date().getFullYear()} © Colby Fayock`,
  footerEditLink: 'Edit this page on GitHub',
  logo: (
    <strong>Next Cloudinary</strong>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Next Cloudinary</title>

      <meta name="description" content="Powerful image and video APIs in Next.js with Cloudinary" />
      <meta name="og:title" content="Next Cloudinary" />
      <meta name="og:description" content="Powerful image and video APIs in Next.js with Cloudinary" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#000000" />

      <CldOgImage
        src="images/turtle"
        tint="100:0000FF:0p:FF1493:100p"
        blur="2000"
        overlays={[{
          text: {
            color: 'white',
            fontFamily: 'Source Sans Pro',
            fontSize: 200,
            fontWeight: 'bold',
            text: 'Next Cloudinary'
          }
        }]}
        twitterTitle="Next Cloudinary"
      />
    </>
  ),
}