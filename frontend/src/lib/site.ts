const productionSiteUrl = 'https://kiduspetros.com'

/**
 * Canonical site URL — set NEXT_PUBLIC_SITE_URL in production if the origin changes.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl
).replace(/\/$/, '')

/** Intentionally crafted search terms first; then supporting English and Amharic variants. */
export const siteKeywords = [
  'kiduspetros.com',
  'Kidus Petros',
  'kidus petros gibi gubae',
  'Kidus Petros Gibi Gubae',
  'Qidus Petros',
  'Qidus Petros Gibi Gubae',
  'Gebi Gubae',
  'Gibi Gubae Petros',
  'St. Peter Gibi Gubae',
  'St. Peter Orthodox Gibi Gubae',
  'St Peter Ethiopian Orthodox',
  'Ethiopian Orthodox Tewahedo',
  'Ethiopian Orthodox Tewahedo Church',
  'Orthodox Christian student fellowship',
  'Addis Ababa University Gibi Gubae',
  'CHS Gibi Gubae',
  'CHS Sefere Selam',
  'Sefere Selam campus',
  'ቅዱስ ጴጥሮስ',
  'ቅዱስ ጴጥሮስ ጊቢ ጉባኤ',
  'ቂዱስ ጴጥሮስ ጊቢ ጉባኤ',
  'ጊቢ ጉባኤ',
  'ግቢ ጉባኤ',
  'ኦርቶዶክስ ጊቢ ጉባኤ',
  'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ',
  'ሰፈረ ሰላም',
  'ጤና ሳይንስ ጊቢ ጉባኤ',
] as const

/**
 * Meta titles & descriptions tuned for broad English and Amharic discovery without keyword stuffing.
 */
export const originalMeta = {
  /** Root `layout.tsx` */
  layoutDescription:
    'Official website of Kidus Petros Gibi Gubae, the Ethiopian Orthodox Tewahedo student fellowship at CHS Sefere Selam in Addis Ababa. Find faith teaching, events, gallery updates, history, and contact information in English and Amharic.',
  /** `app/page.tsx` */
  homeDescription:
    'Welcome to Kidus Petros Gibi Gubae. Learn about our Ethiopian Orthodox Tewahedo faith, student fellowship, weekly services, divisions, events, and community life at Sefere Selam.',
  /** Root `layout.tsx` openGraph (separate from `metadata.description` in the original file). */
  layoutOpenGraph: {
    title: 'Kidus Petros Gibi Gubae | ቅዱስ ጴጥሮስ ጊቢ ጉባኤ',
    description:
      'Official home of Kidus Petros Gibi Gubae, an Ethiopian Orthodox Tewahedo student fellowship sharing services, history, events, and updates.',
  },
  about: {
    title: 'About Kidus Petros Gibi Gubae | ቅዱስ ጴጥሮስ',
    description:
      'Learn the history, mission, leadership, and Orthodox Christian foundation of Kidus Petros Gibi Gubae at CHS Sefere Selam in Addis Ababa.',
  },
  events: {
    title: 'Events and Weekly Services | Kidus Petros Gibi Gubae',
    description:
      'View weekly services, teaching programs, fellowship gatherings, and special Ethiopian Orthodox events from Kidus Petros Gibi Gubae.',
  },
  divisions: {
    title: 'Divisions and Ministries | Kidus Petros Gibi Gubae',
    description:
      'Explore the service divisions, ministries, media work, teaching groups, and student-led programs of Kidus Petros Gibi Gubae.',
  },
  contact: {
    title: 'Contact Kidus Petros Gibi Gubae | Addis Ababa',
    description:
      'Contact Kidus Petros Gibi Gubae, find the CHS Sefere Selam campus location in Addis Ababa, and reach the fellowship by phone or social channels.',
  },
  /** No `metadata` on `gallery/page.tsx` originally; same naming as other routes. */
  gallery: {
    title: 'Gallery | Kidus Petros Gibi Gubae',
    description:
      'Browse photos and media from Kidus Petros Gibi Gubae services, events, teaching programs, and Ethiopian Orthodox fellowship life.',
  },
} as const

export const siteConfig = {
  domain: 'kiduspetros.com',
  name: 'ቅዱስ ጴጥሮስ ጊቢ ጉባኤ',
  nameLatin: 'Kidus Petros Gibi Gubae',
  nameEnglish: 'St. Peter Orthodox Gibi Gubae',

  metaTitleDefault: 'Kidus Petros Gibi Gubae | ቅዱስ ጴጥሮስ ጊቢ ጉባኤ',
  metaTitleTemplate: 'Kidus Petros Gibi Gubae',

  defaultDescription: originalMeta.layoutDescription,

  /** Same strings as `originalMeta` — keeps any `siteConfig.metaDescription.*` usage from crashing. */
  metaDescription: {
    home: originalMeta.homeDescription,
    about: originalMeta.about.description,
    events: originalMeta.events.description,
    divisions: originalMeta.divisions.description,
    contact: originalMeta.contact.description,
    gallery: originalMeta.gallery.description,
  },

  keywords: siteKeywords,
  openGraphSiteName: 'Kidus Petros Gibi Gubae',
  sameAs: [
    'https://t.me/kidus_petros_mereja',
    'https://www.instagram.com/kidus_petros_gibi_gubae',
    'https://youtube.com/channel/UCf9ULIkZg3Hlu_KryEOfrjg',
  ],
  address: {
    streetAddress: 'CHS, Sefere Selam campus',
    addressLocality: 'Addis Ababa',
    addressRegion: 'Addis Ababa',
    addressCountry: 'ET',
  },
  telephone: ['+251946406302', '+251972547887'],
  email: 'contact@kiduspetros.com',
} as const
