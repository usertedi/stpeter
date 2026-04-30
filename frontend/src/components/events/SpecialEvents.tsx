"use client";
import { motion } from 'framer-motion'
import { useEvents } from '@/hooks/useEvents'

// Fallback data in case API fails
const fallbackSpecialEvents = [
  {
    _id: '1',
    title: 'No special events for now',
    date: '',
    time: '',
    location: '',
    description: '',
    category: 'special',
  },
]

export default function SpecialEvents() {
  const { events, loading } = useEvents();
  
  // Filter for special events or use fallback data
  const specialEvents = events.length > 0 
    ? events.filter(event => event.category === 'special' || event.featured === true || event.category === 'education')
    : fallbackSpecialEvents;

  if (loading) {
    return (
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Special Events</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Upcoming special events and celebrations
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
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
          <h2 className="heading-2 mb-4">Special Events</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Upcoming special events and celebrations
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {specialEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-primary-700">{event.title}</h3>
                  <div className="mt-2 md:mt-0 px-4 py-1 bg-accent-100 text-accent-700 rounded-full font-medium text-sm">
                    {event.date}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-secondary-600">
                      <span className="font-medium">Time:</span> {event.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-600">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                  </div>
                </div>
                <p className="text-secondary-700">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="mt-12 text-center">
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-6">
            Stay updated with our latest events by subscribing to our newsletter or following us on social media.
          </p>
          <button className="btn-primary">
            Subscribe to Updates
          </button>
        </div> */}
      </div>
    </section>
  )
}