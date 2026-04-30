"use client";
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useDivisions } from '@/hooks/useDivisions'
import { FaPrayingHands, FaHandsHelping, FaMusic, FaBook, FaUsers, FaCoffee, FaMoneyBillWave, FaBullhorn, FaTools } from 'react-icons/fa'

// Icon mapping for divisions (same approach as FeaturedDivisions)
const iconMap: { [key: string]: any } = {
  'worship': FaPrayingHands,
  'outreach': FaHandsHelping,
  'music': FaMusic,
  'education': FaBook,
  'youth': FaUsers,
  'hospitality': FaCoffee,
  'finance': FaMoneyBillWave,
  'media': FaBullhorn,
  'facilities': FaTools,
  'default': FaPrayingHands,
};

/** Row1: blue, pink, slate — Row2: blue, slate, pink. Backgrounds: sky/pink/slate-100 to match ref pastels (~#E1F5FE, #FCE4EC, #F0F4F8). */
const cardHeaderPalette = [
  'bg-sky-100 text-sky-600',
  'bg-pink-100 text-rose-800',
  'bg-slate-100 text-gray-700',
  'bg-sky-100 text-sky-600',
  'bg-slate-100 text-gray-700',
  'bg-pink-100 text-rose-800',
] as const

// Fallback data expanded to 9 items
const fallbackDivisions = [
  {
    _id: 'static-1',
    name: 'የቋንቋ እና ልዩ ፍላጎት አገልግሎት ማስተባበሪያ ክፍል',
    description: 'በክፍሉ ውስጥ ያሉ አባላትን በመመደብ በተለያዩ ቋንቋዎች ትምህርትን ያሰጣል፤ልዩ ድጋፍ የሚፈልጉ ተማሪዎችን ድጋፍ ይሰጣል። በ ዕቅበተ እምነት ንዑስ ክፍሉ በተለያዩ እምነቶች ጫና ስር ያሉ ተማሪዎችን በመለየት አስፈላጊውን ትምህርት እና ከለላ ይሰጣል።በሀይማኖት ላይ ለሚነሱ ጥያቄዎች ተገቢውን ምላሽ ያሰጣል።',
    icon: 'worship',
    color: 'worship',
  },
  {
    _id: 'static-2',
    name: 'ሙያና በጎ አድራጎት ክፍል',
    description: 'ይህ ክፍል የግቢ ጉባኤው አባላት በሙያቸው ፣ በእውቀታቸው እንዲሁም በጉልበታቸውን ቤተ ክርስቲያንን እና ልጆቿን የሚያገለግሉበትን ሁኔታዎችን ያመቻቻል። _በተጨማሪም መጽሐፍትን ለተማሪዎች ተደራሽ ማድረግ፣ የግቢ ጉባኤው አባላት በቀለም ትምህርታቸው እንዲጠነክሩ ሁኔታዎችን ማመቻቸት፤ ለአዲስ ገቢ ተማሪዎች በሲኒየር ገለጻ orientation በማዘጋጀት የፈተና ወረቀቶችንና ሃንዳውቶችን ማሰባሰብ እና ተደራሽ ያደርጋል ።',
    icon: 'outreach',
    color: 'outreach',
  },
  {
    _id: 'static-3',
    name: 'መዝሙርና ሥነ ጥበባት ክፍል',
    description: 'የግቢ ጉባኤው አባላት በተለያዩ የግቢ ጉባኤው መርሐ ግብራት ላይ መዝሙራትን እና የሥነ ጽሑፍ ሥራዎችን በማቅረብ አባላት ሕይወት ተኮር እና እውቀት ተኮር ትምህርቶችን እንዲቀስሙ የሚያደርግ ክፍል ነው፡፡ እንዲሁም -የተውኔት፣ የግጥም እንዲሁም ሥነ-የሰዕል ተሰጥኦ ያላቸውን ተማሪዎች ክህሎታቸውን እንዲያዳብሩ የሚያደረግ ክፍል ነው። - ወረብ በልዩ ልዩ መርሐ ግብራት ላይ ያስጠናል -በገና እና ከበሮን ተማሪዎችን ያሰለጥናል።',
    icon: 'music',
    color: 'music',
  },
  {
    _id: 'static-4',
    name: 'ትምህርትና ሐዋርያዊ አገልግሎት ክፍል',
    description: 'የግቢ ጉባኤያት አባላት በቅዱስ ወንጌል አስተምህሮ ጎልበተው ለራሳቸው ከፍ ብሎም አጠገባቸው ላለው ሰው ሲልቅም ለቤተክርስቲያን ጋሻ ሆነው ከአጽራረ ቤተክርስቲያን አስተምህሮ ራሳቸውን ጠብቀው ትክክለኛይቱን የሐዋርያት ትምህርት እንዲያውቁ እናም በተግባር እንዲኖሩበት የሚያበረታታ እና የሚያስገነዝብ ክፍል ነው በተጨማሪም አብነት ትምህርትንም ያሰጣል።',
    icon: 'education',
    color: 'education',
  },
  {
    _id: 'static-5',
    name: 'ባች እና መርሐ ግብራት ማስተባበሪያ',
    description: 'የተለያዩ መርሐ ግብራትነ ማስተባበር እንዲሁም መቅረጽ + የግቢ ጉባዬውን አባላት የመርሐ ግብር ተሳትፎ ለመጨመር የተለያዩ የቅስቀሳ መንገዶችን በመጠቀም ቅስቀሳ ማካሄድ እና በመርሐ ግብራት ላይ የሚሳተፉ ተማሪዋችን እቴንዳስ መቆጣጠር እንዲሁም ተማሪዋችን የሚያሳትፉ የተለያዩ ልዬ መርሐ ግብራት ለምሳሌ ጉዞ፣ የበዓል አዳር፣ የጥምቀት እንዲሁም ሌሎች ልዩ ልዩ መርሐ ግብራትን ማዘጋጀት እና ያስተባብራል ።',
    icon: 'youth',
    color: 'youth',
  },
  {
    _id: 'static-6',
    name: 'የአባላት እንክብካቤ፣ ምክክርና የአቅም ማጎልበቻ ስልጠና ክፍል',
    description: 'ከስሙ እንደምንረዳው ዋነኛ ዓላማው በግቢ ጉባኤው ውስጥ በአባልነት ለታቀፉት ተማሪዎች በተለያዩ ዘርፎች ተገቢውን እገዛ (እንክብካቤ) መስጠት መቻል ነው። ለምሳሌ:- ቤተሰብ መመደብ 1 ማዋቀርና ክትትል ማድረግ። -በፀጋቸው ማገልገል የሚችሉ አባላትን አፈላልጎ ወደ አገልግሎት እንዲገቡ ማስቻል። -በግቢ ጉባኤው ውስጥ ለሚገኙት አባላት በየባቻቸው የንስሀ አባት በበቂ ሁኔታ መመደብ። - በየጊዜው ከንስሐ አባቶች ጋር በመገናኘት የአባላቱን መንፈሳዊ ህይወት ክትትል ማድረግ።',
    icon: 'hospitality',
    color: 'hospitality',
  },
  {
    _id: 'static-7',
    name: 'ሒሳብ እና ንብረት ክፍል',
    description: 'ይህ ክፍል የግቢ ጉባኤውን ንብረቶች እንዲሁም በግቢ ጉባኤው ለተለያዩ አገልግሎቶች የሚውሉ ገንዘቦች ዝውውርን በበላይነት የሚቆጣጠር ነው::',
    icon: 'finance',
    color: 'finance',
  },
  {
    _id: 'static-8',
    name: 'መረጃ ማደራጃ የዕቅድ ክትትል እና ሪፖርት ክፍል',
    description: 'የግቢ ጉባኤያችን you tube, instagram እንዲህም ጉባኤ ዘቅዱስ ጴጥሮስ የተሰኘዉን telegram channel በበላይነት የሚከታተል ነው። የግቢ ጉባኤውን ልዩ ልዩ ተግባራትና እንቅስቃሴዎች የሚያሳዩ ፎቶ፣ የድምጽና የምስል/የቪድዮ/ መረጃዎችን ያደራጃል ።',
    icon: 'media',
    color: 'media',
  },
  {
    _id: 'static-9',
    name: 'የልማት እና ገቢ ማሰባሰቢያ ክፍል',
    description: 'ግቢ ጉባኤው ያሉበትን ወጪዎች ለመሸፈን የሚሆን ገንዘብ ማሰባሰብ ዋና አላማው ነው ይህን ለማድረግም የተለያዩ ሰራዎችን ይሰራል ለምሳሌ + በጾም ወቅት ከተማሪዎች የሚስተውን የቁርስ ዳቦ ግማሹን ይሸጣል ግማሹን ለነዳያን ይሰጣል ።እንዲሁም በዙ መንፈሳዊ መጽሐፍትንም በቅናሽ ለተማሪዎች ያቀርባል ::',
    icon: 'facilities',
    color: 'facilities',
  },
  {
    _id: 'static-10',
    name: 'ኦዲት & ኢንስፔክሽን ክፍል',
    description: 'በሁለት አበይት ንዑስ ክፍላት ተደራጅቶ አገልግሎት የሚፈፅም ሲሆን ዋና ሥራውም የግቢ ጉባኤያችንን የአገልግሎት ክፍሎችን እንቅስቃሴ በየወሩ ከዕቅዳቸው ጋር በማነጻጸር ይገመግማል፣ አገልግሎቶቹ በማኅበሩ መመሪያና ደንብ እና/ወይም በግቢ ጉባኤያት የአገልግሎት መዋቅር መመሪያ መሰረት እየተከናወኑ መሆናቸውን ይቆጣጠራል፣ ስህተቶች ወይም ልዩነቶች ሲኖሩ የእርምት አስተያየት በወቅቱ ይሰጣል አንዲሁም የግቢ ጉባኤያችንን ገቢ አና ወጪ መወራረዳቸውን ያረጋግጣል::',
    icon: 'finance',
    color: 'finance',
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
  const { divisions, loading } = useDivisions();

  if (loading) {
    return (
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Service Divisions</h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {/* Learn about the various ministries that serve our church and community */}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const cards = divisions.length > 0 ? divisions.slice(0, 9) : fallbackDivisions;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Service Divisions</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cards.map((division: any, index: number) => {
            const IconComponent = iconMap[division.icon] || iconMap['default'];
            const colorClass =
              cardHeaderPalette[index % cardHeaderPalette.length]
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
                  <h3 className="text-xl font-bold mb-3 text-secondary-900">{division.name || division.title}</h3>
                  <p className="text-secondary-600">{division.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4 text-secondary-900">Get Involved</h3>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto mb-8">
           በተለያዩ የስራ ዘርፎች ላይ ማገልገል ፈቃደኛ ከሆናቹ, please contact us.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us to Volunteer
          </Link>
        </div>
      </div>
    </section>
  )
}