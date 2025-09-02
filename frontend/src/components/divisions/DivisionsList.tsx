"use client";
import { motion } from 'framer-motion'
import { FaPrayingHands, FaHandsHelping, FaMusic, FaBook, FaChild, FaUsers, FaHeart, FaChurch } from 'react-icons/fa'

const divisions = [
  {
    id: 1,
    title: 'Worship & Liturgy',
    description: 'Our Worship & Liturgy division is responsible for organizing and conducting Divine Liturgy and other services throughout the liturgical year. This includes training altar servers, preparing the church for services, and ensuring that all liturgical items are properly maintained.',
    icon: FaPrayingHands,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 2,
    title: 'Community Outreach',
    description: 'The Community Outreach division coordinates our churchs efforts to serve the broader community through charitable works, food drives, homeless ministry, and other social service programs. We believe in putting our faith into action by serving those in need.',
    icon: FaHandsHelping,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    id: 3,
    title: 'Choir & Music',
    description: 'Our Choir & Music division enhances our worship through beautiful Byzantine chant and Orthodox hymns. The choir practices weekly and participates in all Divine Liturgies and special services throughout the year.',
    icon: FaMusic,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    id: 4,
    title: 'Education & Catechism',
    description: 'The Education & Catechism division oversees our Sunday School program, adult education classes, Bible studies, and catechism for those interested in joining the Orthodox Church. We offer educational opportunities for all ages to deepen their understanding of the faith.',
    icon: FaBook,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 5,
    title: 'Youth Ministry',
    description: 'Our Youth Ministry division provides programs and activities for children and teenagers to grow in their faith while building friendships with other Orthodox youth. Activities include regular meetings, retreats, service projects, and social events.',
    icon: FaChild,
    color: 'bg-accent-100 text-accent-700',
  },
  {
    id: 6,
    title: 'Fellowship',
    description: 'The Fellowship division organizes social events and activities that help build community among our parish members. This includes coffee hour after services, parish picnics, holiday celebrations, and other gatherings throughout the year.',
    icon: FaUsers,
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    id: 7,
    title: 'Pastoral Care',
    description: 'Our Pastoral Care division, led by our priest, provides spiritual guidance, counseling, hospital visits, and support for those experiencing life challenges. We strive to care for the spiritual and emotional needs of all our members.',
    icon: FaHeart,
    color: 'bg-primary-100 text-primary-700',
  },
  {
    id: 8,
    title: 'Building & Grounds',
    description: 'The Building & Grounds division maintains our church property, ensuring that our facilities are clean, safe, and welcoming for all who enter. This includes regular maintenance, beautification projects, and planning for future facility needs.',
    icon: FaChurch,
    color: 'bg-accent-100 text-accent-700',
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

export default function DivisionsList() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Service Divisions</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Learn about the various ministries that serve our church and community
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <h3 className="text-xl font-bold mb-3">{division.title}</h3>
                <p className="text-secondary-600">{division.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Get Involved</h3>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
            We welcome all members to participate in our church divisions. If you're interested in serving in any of these areas, please contact us.
          </p>
          <button className="btn-primary">
            Contact Us to Volunteer
          </button>
        </div>
      </div>
    </section>
  )
}