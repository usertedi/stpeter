'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaEnvelope, FaTelegram, FaPhone, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa'

import { formatSiteAddressLines, getGoogleMapsSearchUrl, siteConfig } from '@/lib/site'

type ContactIconLink = {
  href: string
  label: string
  icon: typeof FaMapMarkerAlt
  external?: boolean
}

const iconButtonClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-800 text-primary-500 transition-colors hover:bg-secondary-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'

function IconLinkRow({ links }: { links: ContactIconLink[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={iconButtonClass}
            aria-label={link.label}
            title={link.label}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        )
      })}
    </div>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const address = formatSiteAddressLines()
  const mapsUrl = getGoogleMapsSearchUrl()

  if (pathname.startsWith('/admin')) {
    return null
  }

  const contactLinks: ContactIconLink[] = [
    {
      href: mapsUrl,
      label: `Open location in Google Maps: ${address.line2}`,
      icon: FaMapMarkerAlt,
      external: true,
    },
    {
      href: `tel:${siteConfig.telephone[0]}`,
      label: `Call ${siteConfig.telephone[0].replace('+251', '0')} or ${siteConfig.telephone[1].replace('+251', '0')}`,
      icon: FaPhone,
    },
    {
      href: `mailto:${siteConfig.email}`,
      label: `Email ${siteConfig.email}`,
      icon: FaEnvelope,
    },
  ]

  const followLinks: ContactIconLink[] = [
    {
      href: 'https://t.me/kidus_petros_mereja',
      label: 'Open Telegram channel',
      icon: FaTelegram,
      external: true,
    },
    {
      href: siteConfig.youtubeChannelUrl,
      label: 'Open YouTube channel',
      icon: FaYoutube,
      external: true,
    },
  ]

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
          <div className="min-w-0">
            <h3 className="mb-4 font-serif text-lg font-bold sm:text-xl">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-secondary-300 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/divisions" className="text-secondary-300 transition-colors hover:text-white">
                  Our Divisions
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-secondary-300 transition-colors hover:text-white">
                  Weekly Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-secondary-300 transition-colors hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0 space-y-6">
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold sm:text-xl">Contact Us</h3>
              <IconLinkRow links={contactLinks} />
            </div>
            <div>
              <h3 className="mb-4 font-serif text-lg font-bold sm:text-xl">Follow Us</h3>
              <IconLinkRow links={followLinks} />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-800 pt-6 text-center text-sm text-secondary-400 sm:mt-10">
          <p className="break-words px-2">
            &copy; {currentYear} ቅዱስ ጴጥሮስ ጊቢ ጉባኤ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
