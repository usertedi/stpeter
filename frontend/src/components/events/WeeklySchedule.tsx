"use client";
import { motion } from 'framer-motion'

const weeklyEvents = [
  {
    day: 'እሑድ',
    events: [
      { time: '7:30 - 10:30 LT', title: 'የአብነት ትምህርት & የመዝሙር ጥናት', location: '' },
    ],
  },
  {
    day: 'ሰኞ',
    events: [
      { time: '11:45 LT', title: 'የ3ተኛ ዓመቶች ኮርስ', location: '' },
    ],
  },
   {
    day: 'ማክሰኞ',
    events: [
      { time: '11:45 LT', title: 'የመዝሙር ጥናት', location: '' },
    ],
  },
  {
    day: 'ረቡዕ',
    events: [
      { time: '11:45 LT', title: 'የ4ተኛ ዓመቶች ኮርስ', location: '' },
    ],
  },
  {
    day: 'ኀሙስ',
    events: [
      { time: '11:45 LT', title: 'የ1ኛ & የ2ተኛ ዓመቶች ኮርስ', location: '' },
    ],
  },
  {
    day: 'ዓርብ',
    events: [
      { time: '11:45 LT', title: 'የአንድነት መርሐግብር', location: '' },
    ],
  },
  {
    day: 'Saturday',
    events: [
      { time: '7:30 - 10:30 LT', title: 'የአብነት ትምህርት & የበገና መዝሙር ጥናት', location: '' },
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
            መደበኛ ሳምንታዊ መርሀ ግብሮች
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
                        <p className="font-medium text-secondary-900">{event.title}</p>
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
      </div>
    </section>
  )
}