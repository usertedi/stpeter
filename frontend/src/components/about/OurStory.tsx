"use client";
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function OurStory() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-6">Our Story</h2>
            <div className="w-20 h-1 bg-primary-600 mb-8"></div>
            <p className="text-lg text-secondary-700 mb-6">
              St. Peter Orthodox Church was established in 1975 by a small group of dedicated Orthodox Christians who sought to create a spiritual home for their families and future generations.
            </p>
            <p className="text-lg text-secondary-700 mb-6">
              What began as a humble mission with just a few families has grown into a vibrant parish serving hundreds of faithful from various backgrounds and traditions. Our church building, completed in 1985, stands as a testament to the dedication and sacrifice of our founding members.
            </p>
            <p className="text-lg text-secondary-700">
              Today, we continue to honor our rich Orthodox heritage while embracing our role as a modern church community that serves the spiritual and social needs of our members and the broader community.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            {/* This would be replaced with an actual image in production */}
            <div className="absolute inset-0 bg-secondary-200 flex items-center justify-center">
              <span className="text-secondary-400 text-lg">[Church Building Image]</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}