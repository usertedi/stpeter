'use client';

import { motion } from 'framer-motion';

export default function GalleryHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto text-center"
    >
      <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white">
        Our Gallery
      </h1>
      <p className="mt-2 text-secondary-100 text-base md:text-lg">
        ፎቶዎች
      </p>
    </motion.div>
  );
}
