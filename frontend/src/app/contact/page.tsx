import type { Metadata } from 'next'

import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import Map from '@/components/contact/Map'
import JsonLd from '@/components/seo/JsonLd'
import { originalMeta, siteConfig, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: originalMeta.contact.title },
  description: originalMeta.contact.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: originalMeta.contact.title,
    description: originalMeta.contact.description,
    url: `${siteUrl}/contact`,
  },
  twitter: {
    title: originalMeta.contact.title,
    description: originalMeta.contact.description,
  },
}

export default function ContactPage() {
  const contactPageSchema = {
    '@type': 'ContactPage',
    name: `Contact — ${siteConfig.nameLatin}`,
    url: `${siteUrl}/contact`,
    mainEntity: { '@id': `${siteUrl}/#organization` },
  }

  const localPlace = {
    '@type': 'PlaceOfWorship',
    '@id': `${siteUrl}/contact#location`,
    name: siteConfig.nameLatin,
    url: `${siteUrl}/contact`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    telephone: siteConfig.telephone.join(', '),
    email: siteConfig.email,
  }

  return (
    <>
      <JsonLd data={[contactPageSchema, localPlace]} />
      <main className="min-h-screen">
        <ContactHero />
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
          <Map />
        </div>
      </main>
    </>
  )
}
