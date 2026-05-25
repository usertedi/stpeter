import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteJsonLd from '@/components/seo/siteJsonLd'
import { Toaster } from 'react-hot-toast'
import { originalMeta, siteConfig, siteUrl } from '@/lib/site'

/** `public/og-image.jpg` — Ethiopian Orthodox icon of Kidus Petros (640×640). */
const ogImage = {
  url: '/og-image.jpg',
  width: 640,
  height: 640,
  alt: 'ቅዱስ ጴጥሮስ — Ethiopian Orthodox icon of Saint Peter (Kidus Petros)',
} as const

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.openGraphSiteName,
  authors: [{ name: siteConfig.openGraphSiteName, url: siteUrl }],
  creator: siteConfig.openGraphSiteName,
  publisher: siteConfig.openGraphSiteName,
  category: 'Ethiopian Orthodox Tewahedo student fellowship',
  title: {
    default: siteConfig.metaTitleDefault,
    template: `%s | ${siteConfig.metaTitleTemplate}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: '/',
    languages: {
      'am-ET': '/',
      'x-default': '/',
    },
  },
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: originalMeta.layoutOpenGraph.title,
    description: originalMeta.layoutOpenGraph.description,
    url: siteUrl,
    siteName: siteConfig.openGraphSiteName,
    locale: 'am_ET',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: originalMeta.layoutOpenGraph.title,
    description: originalMeta.layoutOpenGraph.description,
    images: [ogImage.url],
  },
  verification: {
    google: 'FoZthXo7Ex0BI6HwrGtThORGxZplYlCvCPXKIsDwgws',
  },
  other: {
    /** Google / Chrome translation opt-out (with `translate="no"` + `notranslate` on `<html>`). */
    google: 'notranslate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="am-ET"
      translate="no"
      className={`notranslate ${inter.variable} ${merriweather.variable}`}
    >
      <head>
        {/* Spec form; `metadata.other` only emits `name=` metas which is not Content-Language. */}
        <meta httpEquiv="Content-Language" content="am-ET" />
      </head>
      <body className="notranslate flex min-h-screen min-w-0 flex-col overflow-x-hidden">
        <SiteJsonLd />
        <Header />
        <main className="min-w-0 flex-grow overflow-x-hidden">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
