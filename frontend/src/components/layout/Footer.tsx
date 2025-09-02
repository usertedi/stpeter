import Link from 'next/link'
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">St. Peter Orthodox Church</h3>
            <p className="text-secondary-300 mb-4">
              Serving the community with faith, love, and compassion since 1975.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
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

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-secondary-300">123 Church Street, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary-500 mr-3 flex-shrink-0" />
                <span className="text-secondary-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@stpeterorthodox.org" className="text-secondary-300 hover:text-white transition-colors">
                  info@stpeterorthodox.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-12 pt-6 text-center text-secondary-400">
          <p>&copy; {currentYear} St. Peter Orthodox Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}