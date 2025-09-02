'use client';

import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg shadow-md p-6 md:p-8"
    >
      <h2 className="heading-2 mb-6">Church Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-bold text-gray-800">Address</h3>
            <p className="text-gray-600">123 Main Street<br />Anytown, ST 12345</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-bold text-gray-800">Phone</h3>
            <p className="text-gray-600">(123) 456-7890</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-bold text-gray-800">Email</h3>
            <p className="text-gray-600">info@stpeterorthodox.org</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <ClockIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="ml-4">
            <h3 className="font-bold text-gray-800">Service Hours</h3>
            <div className="text-gray-600">
              <p><span className="font-medium">Sunday Divine Liturgy:</span> 10:00 AM</p>
              <p><span className="font-medium">Saturday Vespers:</span> 6:00 PM</p>
              <p><span className="font-medium">Weekday Services:</span> See Events Calendar</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-3">Office Hours</h3>
        <ul className="text-gray-600 space-y-1">
          <li><span className="font-medium">Monday - Friday:</span> 9:00 AM - 4:00 PM</li>
          <li><span className="font-medium">Saturday:</span> 10:00 AM - 2:00 PM</li>
          <li><span className="font-medium">Sunday:</span> 9:00 AM - 1:00 PM</li>
        </ul>
      </div>
    </motion.div>
  );
}