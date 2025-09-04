"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEvents } from '@/hooks/useEvents'

// Fallback data in case API fails
const fallbackEvents = [
  {
    _id: '1',
    title: 'Sunday Divine Liturgy',
    date: 'Every Sunday',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Church',
    description: 'Join us for our weekly Divine Liturgy service',
    category: 'worship',
    isRecurring: true,
  },
  {
    _id: '2',
    title: 'Bible Study Group',
    date: 'Every Wednesday',
    time: '7:00 PM - 8:30 PM',
    location: 'Church Hall',
    description: 'Weekly Bible study and discussion group',
    category: 'education',
    isRecurring: true,
  },
  {
    _id: '3',
    title: 'Youth Group Meeting',
    date: 'Every Friday',
    time: '6:30 PM - 8:00 PM',
    location: 'Youth Center',
    description: 'Youth group activities and fellowship',
    category: 'youth',
    isRecurring: true,
  },
]

export default function UpcomingEvents() {
  const { events, loading, error } = useEvents();
  
  // Use API data if available, otherwise fallback to static data
  const upcomingEvents = events.length > 0 ? events.slice(0, 3) : fallbackEvents;

  if (loading) {
    return (
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Upcoming Events</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Join us for our weekly services and community events
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Upcoming Events</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Join us for our weekly services and community events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="mb-4">
                  <p className="text-secondary-600">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <p className="text-secondary-600">
                    <span className="font-medium">Time:</span> {event.time}
                  </p>
                  <p className="text-secondary-600">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/events" className="btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}