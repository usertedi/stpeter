'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaEnvelope, FaTelegram, FaPhone, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa'

import { formatSiteAddressLines, getGoogleMapsSearchUrl, siteConfig } from '@/lib/site'

const youtubeChannelUrl = 'https://www.youtube.com/@ቅዱስጴጥሮስግቢጉባኤkidusp'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const address = formatSiteAddressLines()
  const mapsUrl = getGoogleMapsSearchUrl()

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-8 sm:py-10">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold sm:text-xl">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-secondary-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/divisions" className="text-secondary-300 hover:text-white transition-colors">
                  Our Divisions
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-secondary-300 hover:text-white transition-colors">
                  Weekly Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-secondary-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-bold sm:text-xl">Contact Us</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0 text-primary-500 sm:mr-3" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 transition-colors hover:text-white"
                >
                  {address.line1}
                  <br />
                  {address.line2}
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 flex-shrink-0 text-primary-500 sm:mr-3" />
                <span className="text-secondary-300">0946406302 or 0972547887</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 flex-shrink-0 text-primary-500 sm:mr-3" />
                <a href={`mailto:${siteConfig.email}`} className="break-words text-secondary-300 transition-colors hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start">
                <FaTelegram className="mt-1 mr-2 flex-shrink-0 text-primary-500 sm:mr-3" />
                <a href="https://t.me/kidus_petros_mereja" target="_blank" rel="noopener noreferrer" className="break-words text-secondary-300 transition-colors hover:text-white">
                  t.me/kidus_petros_mereja
                </a>
              </li>
              <li className="flex items-start">
                <FaYoutube className="mt-1 mr-2 flex-shrink-0 text-primary-500 sm:mr-3" />
                <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="break-words text-secondary-300 transition-colors hover:text-white">
                  youtube.com/@ቅዱስጴጥሮስግቢጉባኤkidusp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-secondary-800 pt-6 text-center text-sm text-secondary-400 sm:mt-10">
          <p>&copy; {currentYear} ቅዱስ ጴጥሮስ ጊቢ ጉባኤ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}