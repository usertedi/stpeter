"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary-700 text-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            We invite you to join us for worship, fellowship, and service. Whether you're new to Orthodoxy or a lifelong member, there's a place for you in our church family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Contact Us
            </Link>
            <Link href="/events" className="btn border-2 border-white text-white hover:bg-primary-600">
              View Schedule
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}