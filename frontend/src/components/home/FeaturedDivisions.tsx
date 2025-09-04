"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPrayingHands, FaHandsHelping, FaMusic, FaBook } from 'react-icons/fa'
import { useDivisions } from '@/hooks/useDivisions'

// Icon mapping for divisions
const iconMap: { [key: string]: any } = {
  'worship': FaPrayingHands,
  'outreach': FaHandsHelping,
  'music': FaMusic,
  'education': FaBook,
  'default': FaPrayingHands,
};

// Color mapping for divisions
const colorMap: { [key: string]: string } = {
  'worship': 'bg-primary-100 text-primary-700',
  'outreach': 'bg-accent-100 text-accent-700',
  'music': 'bg-secondary-100 text-secondary-700',
  'education': 'bg-primary-100 text-primary-700',
  'default': 'bg-primary-100 text-primary-700',
};

// Fallback data in case API fails
const fallbackDivisions = [
  {
    _id: '1',
    name: 'Worship & Prayer',
    description: 'Join us for Divine Liturgy, prayer services, and spiritual guidance.',
    icon: 'worship',
    color: 'worship',
  },
  {
    _id: '2',
    name: 'Community Outreach',
    description: 'Serving our community through charity work and social programs.',
    icon: 'outreach',
    color: 'outreach',
  },
  {
    _id: '3',
    name: 'Choir & Music',
    description: 'Experience the beauty of Orthodox hymns and musical traditions.',
    icon: 'music',
    color: 'music',
  },
  {
    _id: '4',
    name: 'Education',
    description: 'Learn about Orthodox faith through classes, study groups, and resources.',
    icon: 'education',
    color: 'education',
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
  const { divisions, loading, error } = useDivisions();
  
  // Use API data if available, otherwise fallback to static data
  const featuredDivisions = divisions.length > 0 ? divisions.slice(0, 4) : fallbackDivisions;

  if (loading) {
    return (
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Divisions</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore the various ministries and divisions that make up our church community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {featuredDivisions.map((division) => {
            const IconComponent = iconMap[division.icon] || iconMap['default'];
            const colorClass = colorMap[division.color] || colorMap['default'];
            
            return (
            <motion.div 
              key={division._id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`p-6 ${colorClass} flex justify-center`}>
                <IconComponent size={40} />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{division.name}</h3>
                <p className="text-secondary-600 mb-4">{division.description}</p>
                <Link href="/divisions" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
            );
          })}
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