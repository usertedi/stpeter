"use client";
import { motion } from 'framer-motion'

export default function ContactHero() {
  return (
    <div className="relative bg-secondary-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/contact-hero.jpg')] bg-cover bg-bottom">
        <div className="absolute inset-0 bg-secondary-900/70" />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Contact Us
          </h1>
        </motion.div>
      </div>
    </div>
  )
}
