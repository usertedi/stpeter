'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Default albums - these will be dynamically generated from actual data
const defaultAlbums = [
  { id: 'all', name: 'All Photos' },
  { id: 'services', name: 'Church Services' },
  { id: 'events', name: 'Special Events' },
  { id: 'community', name: 'Community Outreach' },
  { id: 'holidays', name: 'Holidays & Celebrations' },
  { id: 'youth', name: 'Youth Activities' }
];

interface AlbumFilterProps {
  activeAlbum: string;
  onAlbumChange: (album: string) => void;
  availableAlbums?: string[];
}

export default function AlbumFilter({ activeAlbum, onAlbumChange, availableAlbums = [] }: AlbumFilterProps) {
  // Generate albums from available data or use defaults
  const albums = availableAlbums.length > 0 
    ? [
        { id: 'all', name: 'All Photos' },
        ...availableAlbums.map(album => ({
          id: album,
          name: album.charAt(0).toUpperCase() + album.slice(1).replace(/([A-Z])/g, ' $1')
        }))
      ]
    : defaultAlbums;

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
            onClick={() => onAlbumChange(album.id)}
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