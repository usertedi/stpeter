"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="relative bg-primary-900 text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/images/church-hero.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary-900/70" />
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32 lg:py-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Welcome to St. Peter Orthodox Church
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8">
            A place of worship, community, and spiritual growth for all who seek to deepen their faith
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn-primary">
              Learn More
            </Link>
            <Link href="/contact" className="btn bg-white text-primary-900 hover:bg-primary-50">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}