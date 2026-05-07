'use client';

import { motion } from 'framer-motion';

const albumIdIsYouth = (id: string) => id.trim().toLowerCase() === 'youth';

// Default albums - these will be dynamically generated from actual data
const defaultAlbums = [
  { id: 'all', name: 'All Photos' },
  { id: 'services', name: 'Church Services' },
  { id: 'events', name: 'Special Events' },
  { id: 'community', name: 'Community Outreach' },
  { id: 'holidays', name: 'Holidays & Celebrations' },
];

interface AlbumFilterProps {
  activeAlbum: string;
  onAlbumChange: (album: string) => void;
  availableAlbums?: string[];
  /** On dark hero: tighter spacing, no secondary heading; pill styling for contrast */
  variant?: 'default' | 'hero';
}

export default function AlbumFilter({
  activeAlbum,
  onAlbumChange,
  availableAlbums = [],
  variant = 'default',
}: AlbumFilterProps) {
  // Generate albums from available data or use defaults
  const albums = availableAlbums.length > 0
    ? [
        { id: 'all', name: 'All Photos' },
        ...availableAlbums
          .filter((album) => !albumIdIsYouth(String(album)))
          .map((album) => ({
            id: album,
            name: album.charAt(0).toUpperCase() + album.slice(1).replace(/([A-Z])/g, ' $1'),
          })),
      ]
    : defaultAlbums;

  const isHero = variant === 'hero';

  const pillClass = (isActive: boolean) => {
    if (isHero) {
      return isActive
        ? 'border-2 border-primary bg-white text-secondary-900 shadow-sm'
        : 'border border-white/35 bg-transparent text-white hover:bg-white/10';
    }
    return isActive
      ? 'border-2 border-primary bg-white text-primary-800 shadow-sm'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent';
  };

  return (
    <div className={isHero ? 'mt-5 md:mt-6' : 'mb-8'}>
      {!isHero && (
        <h2 className="heading-2 mb-6 text-center">Browse Our Albums</h2>
      )}

      <motion.div
        className="flex flex-wrap justify-center gap-2 md:gap-3"
        initial={{ opacity: 0, y: isHero ? 8 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {albums.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => onAlbumChange(album.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${pillClass(activeAlbum === album.id)}`}
          >
            {album.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
}