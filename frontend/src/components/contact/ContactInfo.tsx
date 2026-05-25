'use client';

import { motion } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { FaYoutube } from 'react-icons/fa';

import { formatSiteAddressLines, getGoogleMapsSearchUrl, siteConfig } from '@/lib/site';

const telegramUrl = 'https://t.me/kidus_petros_mereja';

export default function ContactInfo() {
  const address = formatSiteAddressLines();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-lg bg-white p-6 shadow-md md:p-8"
    >
      <h2 className="heading-2 mb-6">Contact Us</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <MapPinIcon className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
          <div className="ml-4 min-w-0 flex-1">
            <h3 className="font-bold text-gray-800">Address</h3>
            <a
              href={getGoogleMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-gray-600 transition-colors hover:text-primary-600 hover:underline"
            >
              {address.line2}
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <PhoneIcon className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
          <div className="ml-4 min-w-0 flex-1">
            <h3 className="font-bold text-gray-800">Phone</h3>
            <p className="break-words text-gray-600">0946406302 or 0972547887</p>
          </div>
        </div>

        <div className="flex items-start">
          <EnvelopeIcon className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
          <div className="ml-4 min-w-0 flex-1">
            <h3 className="font-bold text-gray-800">Email</h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="break-all text-gray-600 hover:text-primary-600 hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <h2 className="heading-2 mb-6 mt-10">Follow Us</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <ChatBubbleLeftRightIcon className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
          <div className="ml-4 min-w-0 flex-1">
            <h3 className="font-bold text-gray-800">Telegram</h3>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-gray-600 hover:text-primary-600 hover:underline"
            >
              t.me/kidus_petros_mereja
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <FaYoutube className="mt-1 h-6 w-6 flex-shrink-0 text-primary-600" />
          <div className="ml-4 min-w-0 flex-1">
            <h3 className="font-bold text-gray-800">YouTube</h3>
            <a
              href={siteConfig.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-gray-600 hover:text-primary-600 hover:underline"
            >
              youtube.com/@ቅዱስጴጥሮስግቢጉባኤkidusp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
