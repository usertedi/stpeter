"use client";
import { motion } from 'framer-motion'

export default function GalleryHero() {
  return (
    <div className="relative bg-secondary-900 text-white overflow-hidden">
      <div className="container-custom relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-secondary-100 mb-4">
            ፎቶዎች
          </p>
        </motion.div>
      </div>
    </div>
  )
}
