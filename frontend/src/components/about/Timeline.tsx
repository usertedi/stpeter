"use client";
import { motion } from 'framer-motion'

const timelineEvents = [
  {
    year: '1975',
    title: 'Foundation',
    description: 'St. Peter Orthodox Church was established by a small group of dedicated Orthodox Christians.',
  },
  {
    year: '1978',
    title: 'First Divine Liturgy',
    description: 'The first Divine Liturgy was celebrated in a rented space with visiting clergy.',
  },
  {
    year: '1980',
    title: 'Land Purchase',
    description: 'The community purchased land for a permanent church building.',
  },
  {
    year: '1985',
    title: 'Church Building',
    description: 'Our beautiful church building was completed and consecrated.',
  },
  {
    year: '1995',
    title: 'Community Center',
    description: 'The parish hall and community center were added to accommodate growth.',
  },
  {
    year: '2010',
    title: 'Iconography Project',
    description: 'Major iconography project completed, adorning the church with traditional Orthodox imagery.',
  },
  {
    year: '2020',
    title: 'Digital Ministry',
    description: 'Expanded our reach through online services and digital ministry during global challenges.',
  },
  {
    year: 'Today',
    title: 'Growing Community',
    description: 'Continuing to grow and serve as a spiritual home for Orthodox Christians and seekers.',
  },
]

export default function Timeline() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Journey</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Key milestones in the history of St. Peter Orthodox Church
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="md:w-1/2"></div>
                <div className="flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center relative z-10">
                    <span className="text-sm font-bold">{event.year}</span>
                  </div>
                </div>
                <div className="md:w-1/2 pt-4 md:pt-0 md:px-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-primary-700 mb-2">{event.title}</h3>
                    <p className="text-secondary-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}