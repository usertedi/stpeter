'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for albums
const albums = [
  { id: 'all', name: 'All Photos' },
  { id: 'services', name: 'Church Services' },
  { id: 'events', name: 'Special Events' },
  { id: 'community', name: 'Community Outreach' },
  { id: 'holidays', name: 'Holidays & Celebrations' },
  { id: 'youth', name: 'Youth Activities' }
];

export default function AlbumFilter() {
  const [activeAlbum, setActiveAlbum] = useState('all');

  return (
    <div className="mb-8">
      <h2 className="heading-2 mb-6 text-center">Browse Our Albums</h2>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setActiveAlbum(album.id)}
            className={`px-4 py-2 rounded-full transition-all ${activeAlbum === album.id 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            {album.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
}