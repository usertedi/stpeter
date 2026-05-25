'use client';

import { motion } from 'framer-motion';
import { getGoogleMapsSearchUrl, siteConfig } from '@/lib/site';

export default function Map() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12"
    >
      <div className="heading-2 mb-6 text-center" aria-hidden="true">
        <span className="invisible block">Find Us</span>
      </div>

      <div className="rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-100 min-h-[360px] relative border border-gray-100">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),transparent_25%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.85),transparent_20%)]" />
        <div className="relative z-10 flex min-h-[360px] items-center justify-center p-6">
          <div className="max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Location</p>
            <h3 className="mt-2 text-2xl font-bold text-secondary-900">{siteConfig.nameLatin}</h3>
            <address className="mt-4 not-italic text-secondary-700">
              {siteConfig.address.streetAddress}<br />
              {siteConfig.address.addressLocality}, {siteConfig.address.addressCountry}
            </address>
            <a
              href={getGoogleMapsSearchUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}