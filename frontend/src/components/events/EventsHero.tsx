"use client";
import { motion } from 'framer-motion'

export default function EventsHero() {
  return (
    <div className="relative bg-accent-700 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/images/events-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-accent-700/70" />
      </div>
      
      <div className="container-custom relative z-10 py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Events & Schedule
          </h1>
          <p className="text-lg md:text-xl text-accent-100 mb-4">
            Join us for weekly services and special events throughout the year
          </p>
        </motion.div>
      </div>
    </div>
  )
}