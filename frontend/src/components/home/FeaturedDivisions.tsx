"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useDivisions } from '@/hooks/useDivisions'
import {
  divisionColorClassMap,
  divisionIconMap,
  normalizeDivisionThemeId,
} from '@/lib/divisionDisplay'

// Fallback data in case API fails
const fallbackDivisions = [
  {
    _id: '1',
    name: 'የቋንቋ እና ልዩ ፍላጎት አገልግሎት ማስተባበሪያ ክፍል',
    description: 'በክፍሉ ውስጥ ያሉ አባላትን በመመደብ በተለያዩ ቋንቋዎች ትምህርትን ያሰጣል፤ልዩ ድጋፍ የሚፈልጉ ተማሪዎችን ድጋፍ ይሰጣል። በ ዕቅበተ እምነት ንዑስ ክፍሉ በተለያዩ እምነቶች ጫና ስር ያሉ ተማሪዎችን በመለየት አስፈላጊውን ትምህርት እና ከለላ ይሰጣል።በሀይማኖት ላይ ለሚነሱ ጥያቄዎች ተገቢውን ምላሽ ያሰጣል።',
    icon: 'worship',
    color: 'worship',
  },
  {
    _id: '2',
    name: 'ሙያና በጎ አድራጎት ክፍል',
    description: 'ይህ ክፍል የግቢ ጉባኤው አባላት በሙያቸው ፣ በእውቀታቸው እንዲሁም በጉልበታቸውን ቤተ ክርስቲያንን እና ልጆቿን የሚያገለግሉበትን ሁኔታዎችን ያመቻቻል። _በተጨማሪም መጽሐፍትን ለተማሪዎች ተደራሽ ማድረግ፣ የግቢ ጉባኤው አባላት በቀለም ትምህርታቸው እንዲጠነክሩ ሁኔታዎችን ማመቻቸት፤ ለአዲስ ገቢ ተማሪዎች በሲኒየር ገለጻ orientation በማዘጋጀት የፈተና ወረቀቶችንና ሃንዳውቶችን ማሰባሰብ እና ተደራሽ ያደርጋል ።',
    icon: 'outreach',
    color: 'outreach',
  },
  {
    _id: '3',
    name: 'መዝሙርና ሥነ ጥበባት ክፍል',
    description: 'የግቢ ጉባኤው አባላት በተለያዩ የግቢ ጉባኤው መርሐ ግብራት ላይ መዝሙራትን እና የሥነ ጽሑፍ ሥራዎችን በማቅረብ አባላት ሕይወት ተኮር እና እውቀት ተኮር ትምህርቶችን እንዲቀስሙ የሚያደርግ ክፍል ነው፡፡ እንዲሁም -የተውኔት፣ የግጥም እንዲሁም ሥነ-የሰዕል ተሰጥኦ ያላቸውን ተማሪዎች ክህሎታቸውን እንዲያዳብሩ የሚያደረግ ክፍል ነው። - ወረብ በልዩ ልዩ መርሐ ግብራት ላይ ያስጠናል -በገና እና ከበሮን ተማሪዎችን ያሰለጥናል።',
    icon: 'music',
    color: 'music',
  },
  {
    _id: '4',
    name: 'ትምህርትና ሐዋርያዊ አገልግሎት ክፍል',
    description: 'የግቢ ጉባኤያት አባላት በቅዱስ ወንጌል አስተምህሮ ጎልበተው ለራሳቸው ከፍ ብሎም አጠገባቸው ላለው ሰው ሲልቅም ለቤተክርስቲያን ጋሻ ሆነው ከአጽራረ ቤተክርስቲያን አስተምህሮ ራሳቸውን ጠብቀው ትክክለኛይቱን የሐዋርያት ትምህርት እንዲያውቁ እናም በተግባር እንዲኖሩበት የሚያበረታታ እና የሚያስገነዝብ ክፍል ነው በተጨማሪም አብነት ትምህርትንም ያሰጣል።',
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

const getDivisionName = (division: { name?: string; title?: string }) => (
  division.name || division.title || 'Division'
)

export default function FeaturedDivisions() {
  const { divisions, loading } = useDivisions();

  // Use API data if available, otherwise fallback to static data
  const featuredDivisions = divisions.length > 0 ? divisions.slice(0, 4) : fallbackDivisions;

  if (loading) {
    return (
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Divisions</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              የጊቢ ጉባኤያችን የተለያዩ የስራ ክፍፍሎች
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
            የጊቢ ጉባኤውን የተለያዩ የስራ ክፍሎች ይጎብኙ
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
            const iconSlug = normalizeDivisionThemeId(division.icon);
            const colorSlug = normalizeDivisionThemeId(division.color);
            const IconComponent = divisionIconMap[iconSlug] ?? divisionIconMap.worship;
            const colorClass =
              divisionColorClassMap[colorSlug] ?? divisionColorClassMap.default;

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
                  <h3 className="text-xl font-bold mb-2 text-secondary-900">
                    {getDivisionName(division)}
                  </h3>
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