"use client";
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <div className="relative bg-secondary-900 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/images/about-hero.jpg')] bg-cover bg-center">
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
            About Our Church
          </h1>
          <p className="text-lg md:text-xl text-secondary-100 mb-4">
            Discover our history, mission, and the people who make our community special
          </p>
        </motion.div>
      </div>
    </div>
  )
}