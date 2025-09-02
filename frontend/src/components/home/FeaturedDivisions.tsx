"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPrayingHands, FaHandsHelping, FaMusic, FaBook } from 'react-icons/fa'

const divisions = [
  {
    id: 1,
    title: 'Worship & Prayer',
    description: 'Join us for Divine Liturgy, prayer services, and spiritual guidance.',
    icon: FaPrayingHands,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 2,
    title: 'Community Outreach',
    description: 'Serving our community through charity work and social programs.',
    icon: FaHandsHelping,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    id: 3,
    title: 'Choir & Music',
    description: 'Experience the beauty of Orthodox hymns and musical traditions.',
    icon: FaMusic,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    id: 4,
    title: 'Education',
    description: 'Learn about Orthodox faith through classes, study groups, and resources.',
    icon: FaBook,
    color: 'bg-primary-100 text-primary-700',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function FeaturedDivisions() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Divisions</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Explore the various ministries and divisions that make up our church community
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {divisions.map((division) => (
            <motion.div 
              key={division.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`p-6 ${division.color} flex justify-center`}>
                <division.icon size={40} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{division.title}</h3>
                <p className="text-secondary-600 mb-4">{division.description}</p>
                <Link href="/divisions" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/divisions" className="btn-primary">
            View All Divisions
          </Link>
        </div>
      </div>
    </section>
  )
}