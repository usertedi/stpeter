'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site';

const mapQuery = encodeURIComponent([
  siteConfig.nameLatin,
  siteConfig.address.streetAddress,
  siteConfig.address.addressLocality,
  siteConfig.address.addressCountry,
].join(', '));

export default function Map() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="heading-2 mb-6 text-center">Find Us</h2>
      
      <div className="rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-100 min-h-[360px] relative border border-secondary-100">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_25%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.7),transparent_20%)]" />
        <div className="relative z-10 flex min-h-[360px] items-center justify-center p-6">
          <div className="max-w-xl rounded-xl bg-white/95 p-6 text-center shadow-lg backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Location</p>
            <h3 className="mt-2 text-2xl font-bold text-secondary-900">{siteConfig.nameLatin}</h3>
            <address className="mt-4 not-italic text-secondary-700">
              {siteConfig.address.streetAddress}<br />
              {siteConfig.address.addressLocality}, {siteConfig.address.addressCountry}
            </address>
            <p className="mt-4 text-sm text-secondary-600">
              Please use the directions link before visiting, especially during feast days or campus schedule changes.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
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