"use client";
import { motion } from 'framer-motion'

const timelineEvents = [
  {
    year: '2005',
    title: 'ምስረታ',
    description: 'ቅ/ጼጥሮስ እውቅና አጊኝቶ ተመሰረተ ኮርስ፣ፅዋ እና ልዩ መርሐ ግብራት ተጀመረ አብነት ትምህርት ቤት ተቆቆመ መንፈሳዊ ጉዞ',
  },
  {
    year: '2006',
    title: 'መንፈሳዊ ጉዞ',
    description: 'መደበኛ መርሐ ግብራት መጠናከር የተማሪ ቁጥር መጨመር መንፈሳዊ ጉዞ',
  },
  {
    year: '2007',
    title: 'ገቢ ማስገቢያ ስራዎች',
    description: 'ለግቢው ገቢ የሚያስገኙ ቆሚ ፕሮጀክቶችን በመንደፍ ተንቀሳቅሷል።',
  },
  {
    year: '2008',
    title: 'ዜማ ትምህርት ቤት',
    description: 'አብነቱን በማጠናከር የቁጥር እና ዜማ ት/ቤት ማስከፈት ተችሏል። ኮርስ በኦሮሞኛ መስጠት ተችሏል። የቤተሰብ ምደባ ተጀምሯል። መንፈሳዊ ጉብኝቶች',
  },
  {
    year: '2009',
    title: 'ስልጣነ ክህነት',
    description: 'ለ ሰባት ተማሪዎች ስልጣነ ክህነት ማሰጠት ችሏል። መደበኛ መርሐ ግብራት መጠናከር መንፈሳዊ ጉዞ',
  },
  {
    year: '2010&11',
    title: 'መርሀ ግብራት መጠንከር',
    description: 'መደበኛ መርሐ ግብራት መጠናከር መንፈሳዊ ጉዞ',
  },
  {
    year: '2012',
    title: 'የቤተሰብ መዋቅር',
    description: 'የቤተሰብ መዋቅር በአዲስ መልክአደራጅቶ መንቀሳቀስ ተችሏል። መደበኛ መርሐ ግብራት መጠናከር መንፈሳዊ ጉዞ',
  },
  {
    year: '2014',
    title: 'በገና ትምህርት ቤት',
    description: '4ተተኪ መምህራን በደረጃ 1 እና 1ተማሪ በደረጃ 2 አሰልጥኗል የበገና ትምህርት ቤቱን አስከፍቷል።',
  },
  {
    year: '2015',
    title: 'መምህራን ስልጠና',
    description: '8 በደረጃ 1 ተተኪ መምህራንን አስመርቆል ቅዱሳት መካናት ጉብኝት',
  },
   {
    year: '2016',
    title: 'ኮርስ በተለያዩ ቋንቋዎች',
    description: 'ሎከር ማሰራት ተችሏል የ ቅድሳት ስዕላት እና በገና ግዢ ተደርጓል በተለያዩ ቆንቆዎች ኮርስ ተሰጥቶል',
  },
]

export default function Timeline() {
  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Journey</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            
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
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 px-2 text-center text-white shadow-sm">
                    <span className="text-sm font-bold leading-tight">{event.year}</span>
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