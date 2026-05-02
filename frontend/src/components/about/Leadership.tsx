"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const leadershipTeam = [
  {
    name: "የ 2016 ስራ አስፈፃሚዎች",
    title: "አገልጋዮች",
    bio: "በ 2016 ላይ ጊቢ ጉባኤው ስራውን ያለማቋረጥ እንዲያደርግ ሲሰሩ የነበሩ አገልጋዮች።",
    image: "/images/2016lead.jpg",
  },
  {
    name: "የ 2017 ስራ አስፈፃሚዎች",
    title: "አገልጋዮች",
    bio: " በ 2017 ላይ ጊቢ ጉባኤው ስራውን ያለማቋረጥ እንዲያደርግ ሲሰሩ የነበሩ አገልጋዮች።",
    image: "/images/2017lead.jpg",
  },
];

export default function Leadership() {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Our Leadership</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            ጊቢ ጉባኤው ሳይስተጓጎል ስራውን እንዲያስኬድ እያደረጉ ያሉ አመራሮች
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {leadershipTeam.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* IMAGE FIXED HERE */}
              <div className="h-64 bg-secondary-200 relative">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-secondary-900">{leader.name}</h3>
                <p className="text-primary-600 font-medium mb-3">
                  {leader.title}
                </p>
                <p className="text-secondary-600">{leader.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
