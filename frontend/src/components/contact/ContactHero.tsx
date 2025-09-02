'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <div className="relative h-[40vh] min-h-[300px] bg-cover bg-center flex items-center justify-center" 
         style={{ backgroundImage: 'url(/images/contact-hero.jpg)' }}>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="container-custom relative z-10 text-center text-white">
        <motion.h1 
          className="heading-1 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        
        <motion.p
          className="text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We'd love to hear from you. Reach out with any questions about our services, 
          events, or how to become part of our community.
        </motion.p>
      </div>
    </div>
  );
}