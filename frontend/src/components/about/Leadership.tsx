"use client";
import { motion } from 'framer-motion'
import { FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa'

const leadershipTeam = [
  {
    name: 'Fr. John Christodoulos',
    title: 'Parish Priest',
    bio: 'Fr. John has served our parish for over 15 years, bringing wisdom and compassion to his ministry.',
    image: '/images/priest.jpg',
    social: {
      email: 'frjohn@stpeterorthodox.org',
      facebook: 'https://facebook.com',
    },
  },
  {
    name: 'Michael Stephanopoulos',
    title: 'Parish Council President',
    bio: 'Michael has been an active member of our community for 20 years and leads our parish council.',
    image: '/images/president.jpg',
    social: {
      email: 'council@stpeterorthodox.org',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    name: 'Anna Papadopoulos',
    title: 'Choir Director',
    bio: 'Anna brings her musical talents and deep knowledge of Orthodox hymns to our worship services.',
    image: '/images/choir-director.jpg',
    social: {
      email: 'choir@stpeterorthodox.org',
      facebook: 'https://facebook.com',
    },
  },
  {
    name: 'George Demetriou',
    title: 'Youth Director',
    bio: 'George leads our youth ministry with energy and dedication to nurturing the faith of our young members.',
    image: '/images/youth-director.jpg',
    social: {
      email: 'youth@stpeterorthodox.org',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
  },
]

export default function Leadership() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Leadership</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Meet the dedicated individuals who guide our parish community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-64 bg-secondary-200 relative">
                {/* This would be replaced with actual images in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-secondary-400 text-lg">[{leader.name} Photo]</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{leader.title}</p>
                <p className="text-secondary-600 mb-4">{leader.bio}</p>
                <div className="flex space-x-3">
                  {leader.social.email && (
                    <a href={`mailto:${leader.social.email}`} className="text-secondary-400 hover:text-primary-600 transition-colors">
                      <FaEnvelope size={18} />
                    </a>
                  )}
                  {leader.social.facebook && (
                    <a href={leader.social.facebook} target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-600 transition-colors">
                      <FaFacebook size={18} />
                    </a>
                  )}
                  {leader.social.twitter && (
                    <a href={leader.social.twitter} target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary-600 transition-colors">
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}