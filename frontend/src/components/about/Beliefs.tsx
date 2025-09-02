"use client";
import { motion } from 'framer-motion'

const beliefs = [
  {
    title: 'The Holy Trinity',
    description: 'We believe in one God in three persons: Father, Son, and Holy Spirit.',
  },
  {
    title: 'Jesus Christ',
    description: 'We believe that Jesus Christ is the Son of God, fully divine and fully human, who became incarnate for our salvation.',
  },
  {
    title: 'The Holy Spirit',
    description: 'We believe in the Holy Spirit, who proceeds from the Father, who together with the Father and the Son is worshipped and glorified.',
  },
  {
    title: 'The Church',
    description: 'We believe in one, holy, catholic, and apostolic Church, which is the body of Christ.',
  },
  {
    title: 'The Sacraments',
    description: 'We believe in the seven sacraments as channels of God grace in our lives.',
  },
  {
    title: 'The Scriptures',
    description: 'We believe the Holy Scriptures to be inspired by God and a faithful witness to His revelation.',
  },
]

export default function Beliefs() {
  return (
    <section className="section bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Beliefs</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            The core tenets of Orthodox Christianity that guide our faith and practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beliefs.map((belief, index) => (
            <motion.div
              key={belief.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-primary-700 mb-3">{belief.title}</h3>
              <p className="text-secondary-600">{belief.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            These beliefs are rooted in the ancient traditions of the Orthodox Church, passed down through generations of faithful Christians. We invite you to learn more about our faith by attending our services and educational programs.
          </p>
        </div>
      </div>
    </section>
  )
}