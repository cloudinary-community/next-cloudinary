import { useRouter } from 'next/router';

export default {
  project: {
    link: 'https://github.com/colbyfayock/next-cloudinary'
  },
  docsRepositoryBase: 'https://github.com/colbyfayock/next-cloudinary/tree/main/docs',
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: '%s – Next Cloudinary'
      }
    }
  },
  footer: {
    text: `MIT ${new Date().getFullYear()} © Colby Fayock`,
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  logo: (
    <strong>Next Cloudinary</strong>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta name="description" content="Powerful image and video APIs in Next.js with Cloudinary" />
      <meta name="og:type" content="website" />
      <meta name="og:description" content="Powerful image and video APIs in Next.js with Cloudinary" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#000000" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1
  }
}