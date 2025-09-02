"use client";
import { motion } from 'framer-motion'

const weeklyEvents = [
  {
    day: 'Sunday',
    events: [
      { time: '9:00 AM', title: 'Orthros (Matins)', location: 'Main Church' },
      { time: '10:00 AM', title: 'Divine Liturgy', location: 'Main Church' },
      { time: '11:30 AM', title: 'Coffee Hour & Fellowship', location: 'Church Hall' },
      { time: '12:00 PM', title: 'Sunday School (Sept-May)', location: 'Education Building' },
    ],
  },
  {
    day: 'Monday',
    events: [
      { time: '6:00 PM', title: 'Adult Education Class', location: 'Church Hall' },
    ],
  },
  {
    day: 'Wednesday',
    events: [
      { time: '6:00 PM', title: 'Vespers', location: 'Main Church' },
      { time: '7:00 PM', title: 'Bible Study', location: 'Church Hall' },
    ],
  },
  {
    day: 'Thursday',
    events: [
      { time: '7:00 PM', title: 'Choir Practice', location: 'Main Church' },
    ],
  },
  {
    day: 'Friday',
    events: [
      { time: '6:30 PM', title: 'Youth Group Meeting', location: 'Youth Center' },
    ],
  },
  {
    day: 'Saturday',
    events: [
      { time: '5:00 PM', title: 'Great Vespers', location: 'Main Church' },
      { time: '6:00 PM', title: 'Confession', location: 'Main Church' },
    ],
  },
]

export default function WeeklySchedule() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Weekly Schedule</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Our regular weekly services and activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklyEvents.map((daySchedule, index) => (
            <motion.div
              key={daySchedule.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="bg-primary-600 text-white p-4">
                <h3 className="text-xl font-bold">{daySchedule.day}</h3>
              </div>
              <div className="p-4">
                {daySchedule.events.length > 0 ? (
                  <ul className="space-y-4">
                    {daySchedule.events.map((event, eventIndex) => (
                      <li key={eventIndex} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <p className="font-bold text-primary-700">{event.time}</p>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-secondary-500">{event.location}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-secondary-500 italic">No scheduled events</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-secondary-50 rounded-lg">
          <p className="text-center text-secondary-600">
            <span className="font-medium">Note:</span> Schedule may change during major feast days and holidays. Please check our announcements or contact the church office for the most up-to-date information.
          </p>
        </div>
      </div>
    </section>
  )
}