import JsonLd from '@/components/seo/JsonLd'
import { siteConfig, siteUrl } from '@/lib/site'

export default function SiteJsonLd() {
  const orgId = `${siteUrl}/#organization`
  const websiteId = `${siteUrl}/#website`

  const organization = {
    '@type': 'PlaceOfWorship',
    '@id': orgId,
    name: siteConfig.nameLatin,
    alternateName: [
      siteConfig.name,
      siteConfig.nameEnglish,
      'Kidus Petros',
      'Qidus Petros Gibi Gubae',
      'St. Peter Orthodox Gibi Gubae',
    ],
    url: siteUrl,
    description: siteConfig.defaultDescription,
    sameAs: siteConfig.sameAs,
    inLanguage: ['am', 'en'],
    areaServed: ['Addis Ababa', 'Ethiopia', 'CHS Sefere Selam'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    telephone: siteConfig.telephone,
    email: siteConfig.email,
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: siteConfig.openGraphSiteName,
    alternateName: [siteConfig.name, siteConfig.nameEnglish, siteConfig.domain],
    description: siteConfig.defaultDescription,
    keywords: siteConfig.keywords.join(', '),
    publisher: { '@id': orgId },
    inLanguage: ['am', 'en'],
  }

  return <JsonLd data={[organization, website]} />
}
