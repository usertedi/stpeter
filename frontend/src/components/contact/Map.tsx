'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Map() {
  // In a real implementation, we would use react-leaflet or Google Maps API
  // This is a placeholder component that would be replaced with actual map integration
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12"
    >
      <h2 className="heading-2 mb-6 text-center">Find Us</h2>
      
      <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] relative">
        {/* Placeholder for map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 text-center">
            Interactive map would be displayed here.<br />
            Using Leaflet.js or Google Maps API integration.
          </p>
        </div>
        
        {/* This would be replaced with actual map component */}
        <div className="absolute inset-0 bg-gray-300 opacity-50">
          {/* Map placeholder */}
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-600">
        <p>123 Main Street, Anytown, ST 12345</p>
        <p className="mt-2">
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Get Directions
          </a>
        </p>
      </div>
    </motion.div>
  );
}