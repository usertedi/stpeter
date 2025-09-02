"use client";
import { motion } from 'framer-motion'

export default function MissionStatement() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-2 mb-6">Our Mission</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-8"></div>
          <p className="text-lg text-secondary-700 mb-6">
            St. Peter Orthodox Church is dedicated to preserving and sharing the rich traditions of Orthodox Christianity while serving our community with love and compassion.
          </p>
          <p className="text-lg text-secondary-700">
            We strive to create a welcoming environment where individuals and families can grow in their faith, build meaningful relationships, and actively participate in the life of the Church and the broader community.
          </p>
        </motion.div>
      </div>
    </section>
  )
}